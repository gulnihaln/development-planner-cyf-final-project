import { Router } from "express";
import db from "./db.js";
import { auth, validInfo } from "./middleware.js";
const jwt = require("jsonwebtoken");
const router = new Router();
const bcrypt = require("bcrypt");
const tokenGenerator = require("./tokenGenerator.js");
import { sendEmail } from "./sendEmail.js";

const cors = require("cors");
router.use(cors());

// Validator term search
const ROLE = ["mentor", "graduate"];
const TERM = /^[A-Za-z]+$/;

// Build Updater function with input
function buildUpdateQuery(columns) {
	let queryItems = [];
	let values = [];

	Object.keys(columns).forEach((key) => {
		if (columns[key] !== null && columns[key] !== undefined) {
			values.push(columns[key]);
			queryItems.push(`${key}=$${values.length + 1}`);
		}
	});
	return [queryItems.join(", "), values];
}

// server endpoint
router.get("/", (_, res) => {
	res.json({ message: "Welcome to the server!" });
});

//  Users endpoints =================================

// TODO restrict access to this endpoint
//GET all users OR get a user with "/users?q={Term}"
router.get("/users", (req, res) => {
	const term = req.query.q;
	if (term) {
		if (term.match(TERM)) {
			//Get users with last_name and first_name from term
			const query = `SELECT id, first_name, last_name, email, sign_up_date FROM users WHERE first_name ILIKE '%${term}%' OR last_name ILIKE '%${term}%'`;
			db.query(query)
				.then((result) => {
					if (result.rowCount) {
						res.send(result.rows);
					} else {
						res.status(404).send("User with user id not found");
					}
				})
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		} else {
			return res.status(500).send("Your term search is wrong!");
		}
	} else {
		//GET all Users
		const query =
			"SELECT id, first_name, last_name, region, role, email, sign_up_date FROM users";
		db.query(query)
			.then((result) => res.send(result.rows))
			.catch((err) => {
				console.error(err.message);
				res.status(500).send(err.message);
			});
	}
});

//GET a user with id
router.get("/user", auth, (req, res) => {
	const id = req.user_id;
	const query =
		"SELECT id, first_name, last_name, region, role, email, sign_up_date FROM users WHERE id = $1";
	db.query(query, [id])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//POST a new user
router.post("/register", validInfo, async (req, res) => {
	const { first_name, last_name, region, role, email, password } = req.body;
	//Validation users
	if (!ROLE.includes(role.toLowerCase())) {
		return res.status(400).send("Choose correct role!");
	}
	// input check
	if (!first_name || !last_name || !region || !role || !email || !password) {
		return res.status(400).send("Please complete all fields!");
	}
	//Validation users with email
	const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
	if (user.rows.length !== 0) {
		res.status(400).send("User Already Exist");
	}
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const bcryptPassword = await bcrypt.hash(password, salt);

	const query =
		"INSERT INTO users (first_name, last_name, region, role, email, password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
	db.query(query, [first_name, last_name, region, role, email.toLowerCase(), bcryptPassword])
		.then((result) => {
			const token = tokenGenerator(result.rows[0].id);
			res.json(token);
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//UPDATE a user details with user id
router.put("/user", auth, async (req, res) => {
	const { user_id } = req;
	const { first_name, last_name, region, role, email, password } = req.body;
	if (!ROLE.includes(role.toLowerCase())) {
		return res.status(400).send("Choose correct role!");
	}
	let bcryptPassword = undefined;
	if(password){
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		bcryptPassword = await bcrypt.hash(password, salt);
	}
	const [queryItems, values] = buildUpdateQuery({
		first_name,
		last_name,
		region,
		role,
		email,
		password: bcryptPassword,
	});
	db.query(`UPDATE users SET ${queryItems} WHERE id=$1 RETURNING *`, [
		user_id,
		...values,
	])
		.then((result) => res.send(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//DELETE a user with id
router.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM users WHERE id=$1 RETURNING *";
	db.query(query, [id])
		.then((result) => {
			if (result.rowCount) {
				res.send(result.rows);
			} else {
				res.status(404).send("Not found user!");
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//POST a user as login
router.post("/users/login", validInfo, (req, res) => {
	const { email, password } = req.body;
	// input check!
	if (!email || !password) {
		return res.status(400).send("Please complete all fields!");
	}
	const query = "SELECT * FROM users WHERE email = $1 ";
	db.query(query, [email.toLowerCase()])
		.then(async (result) => {
			if (result.rowCount) {
				const validPassword = await bcrypt.compare(
					password,
					result.rows[0].password
				);
				if (!validPassword) {
					res.status(401).json("Incorrect passsword!");
				} else {
					const token = tokenGenerator(result.rows[0].id);
					res.json(token);
				}
			} else {
				res.status(401).json("Incorrect Email!");
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

router.patch("/forgot-password", async (req, res) => {
	const { email } = req.body;

	try {
		await db
			.query("SELECT * FROM users WHERE email=$1", [email.toLowerCase()])
			.then((result) => {
				const user = result.rows[0];
				if (result.rowCount === 0) {
					res.status(404).json({ error: "Invalid email" });
				} else {
					const resetLink = jwt.sign(
						{ user: user.email },
						process.env.reset_secret,
						{
							expiresIn: "10m",
						}
					);
					db.query("UPDATE users SET resetlink=$1 WHERE id=$2 RETURNING *", [
						resetLink,
						user.id,
					])
						.then((result) => {
							sendEmail(user, resetLink);
							res.status(200).json({ message: "Check your email" });
						})
						.catch((err) => {
							console.error(err.message);
							res.status(500).send(err.message);
						});
				}
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Reset Password
router.patch("/reset-password/:token", async (req, res) => {
	const resetLink = req.params.token;
	const { password } = req.body;
	const reset = "";
	if (resetLink) {
		jwt.verify(resetLink, process.env.reset_secret, (error, decodedToken) => {
			if (error) {
				res.status(404).json({ message: "Incorrect token or expired" });
			}
		});
	}

	try {
		await db
			.query("SELECT * FROM users WHERE resetlink=$1", [resetLink])
			.then(async (result) => {
				const user = result.rows[0];
				if (result.rowCount === 0) {
					res
						.status(404)
						.json({ error: "We could not find a match for this link" });
				} else {
					const saltRounds = 10;
					const salt = await bcrypt.genSalt(saltRounds);
					const bcryptPassword = await bcrypt.hash(password, salt);

					await db
						.query(
							"UPDATE users SET password=$1, resetLink=$2 WHERE id=$3 RETURNING *",
							[bcryptPassword, reset, user.id]
						)
						.then((result) => {
							res.status(200).json({ message: "Your Password Updated!" });
						});
				}
			});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// user dashboard
router.get("/dashboard", auth, async (req, res) => {
	const user_id = req.user_id;
	try {
		const user = await db.query("SELECT * FROM plans WHERE user_id=$1", [
			user_id,
		]);
		res.json(user.rows);
	} catch (err) {
		console.error(err.message);
		res.status(500).json(err.message);
	}
});

//  Plans endpoints =================================

// GET all plans form specific user
router.get("/plans", auth, (req, res) => {
	const user_id = req.user_id;
	const query = "SELECT * FROM plans WHERE user_id=$1";
	db.query(query, [user_id])
		.then((result) => res.json(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//POST a plan for specific user id
router.post("/plans", auth, (req, res) => {
	const user_id = req.user_id;
	const { title, description } = req.body;
	const query =
		"INSERT INTO plans (user_id, title, description ) VALUES ($1, $2, $3) RETURNING *";
	db.query(query, [user_id, title, description])
		.then((result) => {
			res.send(result.rows[0]);
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// GET a plan form specific user with plan id
router.get("/plans/:plan_id", auth, (req, res) => {
	const { plan_id } = req.params;
	db.query("SELECT u.first_name, u.last_name, plans.id, plans.user_id, plans.title, plans.description, plans.create_date FROM plans INNER JOIN users u on u.id = plans.user_id WHERE plans.id=$1", [plan_id])
		.then((result) => {
			if (result.rowCount) {
				res.send(result.rows[0]);
			} else {
				res.status(404).send(`User doesn't have a plan with id ${plan_id}`);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//UPDATE a plan details with user id
router.put("/plans/:plan_id", auth, (req, res) => {
	const { plan_id } = req.params;
	const user_id = req.user_id;
	const { title, description } = req.body;
	db.query("SELECT * FROM plans WHERE user_id=$1 and id=$2", [
		user_id,
		plan_id,
	]).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(`User ${user_id} doesn't have a plan with id ${plan_id}`);
		} else {
			const [queryItems, values] = buildUpdateQuery({
				title,
				description,
			});
			db.query(`UPDATE plans SET ${queryItems} WHERE id=$1 RETURNING *`, [
				plan_id,
				...values,
			])
				.then(() => res.send(result.rows))
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

// Delete a plan form specific user with plan id
router.delete("/plans/:plan_id", auth, (req, res) => {
	const { plan_id } = req.params;
	const user_id = req.user_id;
	db.query("DELETE FROM plans WHERE id=$1 and user_id=$2 RETURNING *", [
		plan_id,
		user_id,
	])
		.then((result) => {
			if (result.rowCount) {
				res.send(result.rows[0]);
			} else {
				res
					.status(404)
					.send(`User ${user_id} doesn't have a plan with id ${plan_id}`);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//  Goals endpoints =================================

// GET goals form specific user id
router.get("/goals", auth, (req, res) => {
	const user_id = req.user_id;
	const query = `SELECT p.id, p.user_id, p.title, p.description,ARRAY_AGG(g.title  || ' status:'|| g.status) goals_list
					FROM goals g INNER JOIN plans p on p.id=g.plan_id
					WHERE p.user_id=$1 GROUP BY p.id, p.user_id, p.description`;

	db.query(query, [user_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res.status(404).send(`User ${user_id} doesn't have goals`);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// GET goals form specific user id and plan id
router.get("/plans/:plan_id/goals/:goal_id", auth, (req, res) => {
	const { plan_id, goal_id } = req.params;
	// const user_id = req.user_id;
	const query = `SELECT p.user_id, p.id plan_id, g.id goal_id, g.title, g.status, g.start_date, g.end_date, g.create_date  FROM goals g 
	INNER JOIN plans p on p.id = g.plan_id where g.plan_id=$1 and g.id=$2`;

	db.query(query, [plan_id, goal_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res
					.status(404)
					.send(
						`User doesn't have goal with this goal id ${goal_id}`
					);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// GET a goal form specific plan id
router.get("/plans/:plan_id/goals", auth, (req, res) => {
	const { plan_id } = req.params;
	// const user_id = req.user_id;
	const query = `SELECT p.user_id, p.id plan_id, g.id goal_id,  g.title, g.status, g.start_date, g.end_date, g.create_date  FROM goals g 
						INNER JOIN plans p on p.id = g.plan_id where g.plan_id=$1`;
	db.query(query, [ plan_id])
		.then((result) => res.json(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//POST a goal for specific plan id
router.post("/plans/:plan_id/goals", auth, (req, res) => {
	const { plan_id } = req.params;
	const user_id = req.user_id;
	const { title, status, start_date, end_date } = req.body;
	db.query("SELECT * FROM plans WHERE user_id=$1 and id=$2", [
		user_id,
		plan_id,
	]).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(`User ${user_id} doesn't have a plan with id ${plan_id}`);
		} else {
			const query =
				"INSERT INTO goals ( plan_id, title, status, start_date, end_date ) VALUES ($1, $2, $3, $4, $5) RETURNING plan_id, id goal_id, title, status, start_date, end_date, create_date";
			db.query(query, [plan_id, title, status, start_date, end_date])
				.then((result) => {
					res.send(result.rows[0]);
				})
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

//UPDATE a goal for specific plan id and goal id
router.put("/plans/:plan_id/goals/:goal_id", auth, (req, res) => {
	const { plan_id, goal_id } = req.params;
	const user_id = req.user_id;
	const { title, status, start_date, end_date } = req.body;
	db.query(
		`SELECT g.id goal_id, g.title  FROM goals g 
		INNER JOIN plans p on p.id = g.plan_id
		where p.user_id =$1 and g.plan_id=$2 and g.id=$3`,
		[user_id, plan_id, goal_id]
	).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(
					`User ${user_id} doesn't have a plan with id ${plan_id} and goal id ${goal_id} `
				);
		} else {
			const [queryItems, values] = buildUpdateQuery({
				title,
				status,
				start_date,
				end_date,
			});
			db.query(`UPDATE goals SET ${queryItems} WHERE id=$1 RETURNING *`, [
				goal_id,
				...values,
			])
				.then(() => res.send(result.rows[0]))
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

//DELETE a goal for specific plan id
router.delete("/plans/:plan_id/goals/:goal_id", auth, (req, res) => {
	const { plan_id, goal_id } = req.params;
	const user_id = req.user_id;
	db.query(
		`SELECT p.user_id, p.id plan_id, g.id goal_id, g.title, g.status, g.start_date, g.end_date, g.create_date  FROM goals g 
	INNER JOIN plans p on p.id = g.plan_id where p.user_id = $1 and g.plan_id=$2 and g.id=$3`,
		[user_id, plan_id, goal_id]
	).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(
					`User ${user_id} doesn't have a plan with id ${plan_id} and goal id ${goal_id} `
				);
		} else {
			const query = "DELETE FROM goals WHERE id=$1 and plan_id=$2 RETURNING *";
			db.query(query, [goal_id, plan_id])
				.then(() => res.send(result.rows[0]))
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

//  tasks endpoints =================================

// GET all tasks form specific goal id
router.get("/plans/:plan_id/goals/:goal_id/tasks", auth, (req, res) => {
	const { plan_id, goal_id } = req.params;
	const user_id = req.user_id;
	const query = `SELECT t.id, t.goal_id goal_id, t.description, t.status, t.create_date  FROM tasks t 
						INNER JOIN goals g on t.goal_id = g.id 
						INNER JOIN plans p on g.plan_id = p.id 
						where p.id= $1 and t.goal_id=$2`;
	db.query(query, [plan_id, goal_id])
		.then((result) => res.json(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// post a task form specific user id and plan id and goal id
router.post("/plans/:plan_id/goals/:goal_id/tasks", auth, (req, res) => {
	const { goal_id } = req.params;
	const { description, status } = req.body;
	const user_id = req.user_id;
	const query =
		"INSERT INTO tasks ( goal_id, description, status) VALUES ($1, $2, $3) RETURNING *";
	db.query(query, [goal_id, description, status])
		.then((result) => {
			res.send(result.rows[0]);
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

//Get a task for specific user id and plan id and goal id and task id
router.get(
	"/plans/:plan_id/goals/:goal_id/tasks/:task_id",
	auth,
	(req, res) => {
		const { plan_id, goal_id, task_id } = req.params;
		const user_id = req.user_id;
		db.query(
			`SELECT t.id, t.goal_id goal_id, t.description, t.status, t.create_date  FROM tasks t 
			INNER JOIN goals g on t.goal_id = g.id 
			INNER JOIN plans p on g.plan_id = p.id 
			where p.user_id =$1 and p.id= $2 and t.goal_id=$3 and t.id=$4`,
			[user_id, plan_id, goal_id, task_id]
		)
			.then((result) => {
				if (result.rowCount) {
					res.json(result.rows);
				} else {
					res
						.status(404)
						.send(
							"This user doesn't have any data with thses plan id and goal id and task id"
						);
				}
			})
			.catch((err) => {
				console.error(err.message);
				res.status(500).send(err.message);
			});
	}
);

//UPDATE a goal for specific plan id and goal id
router.put(
	"/plans/:plan_id/goals/:goal_id/tasks/:task_id",
	auth,
	(req, res) => {
		const { plan_id, goal_id, task_id } = req.params;
		const { description, status } = req.body;
		const user_id = req.user_id;
		db.query(
			`SELECT t.id, t.goal_id goal_id FROM tasks t 
			INNER JOIN goals g on t.goal_id = g.id 
			INNER JOIN plans p on g.plan_id = p.id 
			where p.user_id =$1 and p.id= $2 and t.goal_id=$3 and t.id=$4`,
			[user_id, plan_id, goal_id, task_id]
		).then((result) => {
			if (result.rows.length === 0) {
				return res
					.status(404)
					.send(
						`User ${user_id} doesn't have any data with id ${plan_id} and goal id ${goal_id} and task id ${task_id} `
					);
			} else {
				const [queryItems, values] = buildUpdateQuery({
					description,
					status,
				});
				db.query(`UPDATE tasks SET ${queryItems} WHERE id=$1 RETURNING *`, [
					task_id,
					...values,
				])
					.then((result) => res.send(result.rows[0]))
					.catch((err) => {
						console.error(err.message);
						res.status(500).send(err.message);
					});
			}
		});
	}
);

//DELETE a task for specific goal id
router.delete(
	"/plans/:plan_id/goals/:goal_id/tasks/:task_id",
	auth,
	(req, res) => {
		const { plan_id, goal_id, task_id } = req.params;
		const user_id = req.user_id;
		const query = "DELETE FROM tasks WHERE id=$1 and goal_id=$2 RETURNING *";
		db.query(query, [task_id, goal_id])
			.then((result) => res.send(result.rows[0]))
			.catch((err) => {
				console.error(err.message);
				res.status(500).send(err.message);
			});
	}
);

//  feedbacks endpoints =================================

// GET all feedbacks form specific user id
router.get("/feedbacks", auth, (req, res) => {
	const user_id = req.user_id;
	const query = `SELECT f.parent_id, p.user_id, p.id plan_id , f.id feedback_id, f.description, f.create_date from feedbacks f 
						INNER JOIN plans p on f.plan_id = p.id 
						where p.user_id= $1
						ORDER BY f.create_date`;
	db.query(query, [user_id])
		.then((result) => res.json(result.rows))
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// GET all feedbacks form specific user id and plan id
router.get("/plans/:plan_id/feedbacks", auth, (req, res) => {
	const { plan_id } = req.params;
	const query = `SELECT  u.first_name, u.last_name, f.user_id, p.id plan_id ,f.parent_id, f.id feedback_id, f.description, f.create_date from feedbacks f
					INNER JOIN plans p on f.plan_id = p.id 
					INNER JOIN users u on u.id = f.user_id 
					where f.plan_id= $1 
					ORDER BY f.create_date`;
	db.query(query, [plan_id])
		.then((result) => {
				res.json(result.rows);
			// 	if (result.rowCount) {
			// 		res.json(result.rows);
			// 	} else {
			// 		res
			// 			.status(404)
			// 			.send(
			// 				`This user doesn't have any feedbaks for this plan id ${plan_id}`
			// 			);
			// 	}
			// })
			// .catch((err) => {
			// 	console.error(err.message);
			// 	res.status(500).send(err.message);
		});
});

// GET a feedbacks form specific feedback id
router.get("/plans/:plan_id/feedbacks/:feedback_id", auth, (req, res) => {
	const { plan_id, feedback_id } = req.params;
	const query = `SELECT u.first_name, u.last_name, f.user_id, p.id plan_id ,f.parent_id, f.id feedback_id, f.description, f.create_date from feedbacks f
					INNER JOIN plans p on f.plan_id = p.id 
					INNER JOIN users u on u.id = f.user_id 
					where f.plan_id= $1 and f.id= $2
					ORDER BY f.create_date`;
	db.query(query, [plan_id, feedback_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows[0]);
			} else {
				res
					.status(404)
					.send(`This user doesn't have a feedbak with this id ${feedback_id}`);
			}
		})
		.catch((err) => {
			console.error(err.message);
			res.status(500).send(err.message);
		});
});

// Post a feedback form user id (mentor) and plan id (user)
router.post("/plans/:plan_id/feedbacks", auth, async (req, res) => {
	const { plan_id } = req.params;
	const { description, parent_id } = req.body;
	const user_id = req.user_id;
	// await db
	// 	.query(
	// 		`SELECT m.id mentor_id, m.first_name mentor_name, g.first_name graduate_name ,p.id plan_id,f.parent_id, f.id feedback_id, p.title plan_title, p.description plan_description, f.description feedback, f.create_date
	// 			FROM feedbacks f
	// 			INNER JOIN plans p ON p.id = f.plan_id
	// 			INNER JOIN users as g ON g.id = p.user_id
	// 			INNER JOIN users as m ON f.user_id= m.id where p.user_id=$1 and f.plan_id=$2`,
	// 		[user_id, plan_id]
	// 	)
	// 	.then((result) => {
	// 		if (result.rows.length === 0) {
	// 			return res
	// 				.status(404)
	// 				.send(`User ${user_id} doesn't have a plan with id ${plan_id}`);
	// 		} else {
				const query =
					"INSERT INTO feedbacks ( user_id, plan_id, description, parent_id) VALUES ($1, $2, $3, $4) RETURNING *";
				db.query(query, [user_id, plan_id, description, parent_id])
					.then((result) => res.send(result.rows))
					.catch((err) => {
						console.error(err.message);
						res.status(500).send(err.message);
					// });
			// }
		}).catch((err) => {
			console.error(err);
		});
});

// UPDATE feedback from plan id
router.put("/plans/:plan_id/feedbacks/:feedback_id", auth, (req, res) => {
	const { plan_id, goal_id, feedback_id } = req.params;
	const { description } = req.body;
	const user_id = req.user_id;
	db.query(
		`SELECT m.id mentor_id, m.first_name mentor_name, g.first_name graduate_name ,p.id plan_id, f.parent_id, f.id feedback_id, p.title plan_title, p.description plan_description, f.description feedback, f.create_date
				FROM feedbacks f
				INNER JOIN plans p ON p.id = f.plan_id
				INNER JOIN users as g ON g.id = p.user_id
				INNER JOIN users as m ON f.user_id= m.id where m.id =$1 and f.plan_id=$2 and f.id=$3
				ORDER BY f.create_date`,
		[user_id, plan_id, feedback_id]
	).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(
					`User ${user_id} doesn't have any data with id ${plan_id} and feedback id ${goal_id} `
				);
		} else {
			const [queryItems, values] = buildUpdateQuery({
				description,
			});
			db.query(`UPDATE feedbacks SET ${queryItems} WHERE id=$1 RETURNING *`, [
				feedback_id,
				...values,
			])
				.then(() => res.send(result.rows[0]))
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

// DELETE a feedbacks form specific feedback id
router.delete("/plans/:plan_id/feedbacks/:feedback_id", auth, (req, res) => {
	const { plan_id, feedback_id } = req.params;
	const user_id = req.user_id;
	const query = `SELECT p.user_id, p.id plan_id , f.id feedback_id, f.description, f.create_date from feedbacks f
						INNER JOIN plans p on f.plan_id = p.id 
						where p.user_id= $1 and f.plan_id= $2 and f.id= $3
						ORDER BY f.create_date`;
	db.query(query, [user_id, plan_id, feedback_id]).then((result) => {
		if (result.rows.length === 0) {
			return res
				.status(404)
				.send(
					`User ${user_id} doesn't have any data with id ${plan_id} and feedback id ${feedback_id}`
				);
		} else {
			const query =
				"DELETE FROM feedbacks WHERE id=$1 and plan_id=$2 RETURNING *";
			db.query(query, [feedback_id, plan_id])
				.then(() => res.send(result.rows[0]))
				.catch((err) => {
					console.error(err.message);
					res.status(500).send(err.message);
				});
		}
	});
});

//Refresh Access Token
router.post("/refresh", (req, res) => {
	const refreshToken = req.body.refreshToken;
	if (!refreshToken) {
		return res.status(400).json("Refresh Token was not provided!");
	}
	try {
		const user_id = jwt.verify(refreshToken, process.env.refreshSecretKey).user;
		const { accessToken } = tokenGenerator(user_id);
		res.json({ accessToken });
	} catch (err) {
		console.error(err.message);
		res.status(500).send(err.message);
	}
});

//verify a user
router.post("/verify", auth, async (req, res) => {
	try {
		res.json({id: req.user_id});
	} catch (err) {
		console.error(err.message);
		res.status(500).send(err.message);
	}
});

export default router;
