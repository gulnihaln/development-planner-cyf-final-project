import { Router } from "express";
const { Pool } = require("pg");

const router = new Router();

const dbUrl =
	process.env.DATABASE_URL ||
	"postgres://postgres:14536@localhost:5432/dev_planner";
const pool = new Pool({
	connectionString: dbUrl,
});

router.get("/", (_, res) => {
	res.json({ message: "Welcome to the server!" });
});

//GET all users OR get a user with "/users?q={Term}"
router.get("/users", (req, res) => {
	const term = req.query.q;
	if (term) {
		//Get users with last_name and first_name from term
		const query = `SELECT id, first_name, last_name, email, sign_up_date FROM users WHERE first_name ILIKE '%${term}%' OR last_name ILIKE '%${term}%'`;
		pool
			.query(query)
			.then((result) => {
				if (result.rowCount) {
					res.json(result.rows);
				} else {
					res.status(404).json({ status: 404, msg: "Not found User!" });
				}
			})
			.catch((err) => console.error(err.message));
	} else {
		//GET all Users
		const query =
			"SELECT id, first_name, last_name, region, role, email, sign_up_date FROM users";
		pool
			.query(query)
			.then((result) => res.json({ Users: result.rows }))
			.catch((err) => console.error(err.message));
	}
});

//GET a user with id
router.get("/users/:id", (req, res) => {
	const { id } = req.params;
	const query =
		"SELECT id, first_name, last_name, sign_up_date FROM users WHERE id = $1";

	pool
		.query(query, [id])
		.then((result) => {
			if (result.rowCount) {
				res.json({ Success: result.rows });
			} else {
				res.status(404).json({ status: 404, msg: "Not found user!" });
			}
		})
		.catch((err) => console.error(err.message));
});

//POST a user
router.post("/register", (req, res) => {
	const { first_name, last_name, region, role, email, password } = req.body;
	//Validation users
	if (!first_name || !last_name || !region || !role || !email || !password) {
		return res
			.status(400)
			.json({ status: 400, msg: "Please complete all fields!" });
	}
	//Validation users with email
	const query = "SELECT * FROM users WHERE email=$1";
	pool
		.query(query, [email])
		.then((result) => {
			if (result.rowCount) {
				res.status(400).json({ status: 400, msg: "User already exists!" });
			}
			const query =
				"INSERT INTO users (first_name, last_name, region, role, email, password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
			pool
				.query(query, [first_name, last_name, region, role, email, password])
				.then((result) => {
					res.json({
						success: "New user has been created!",
						user: result.rows,
					});
				})
				.catch((err) => console.error(err.message));
		})
		.catch((err) => console.error(err.message));
});

//UPDATE a user details with user id
router.put("/users/:id", (req, res) => {
	const { id } = req.params;
	const { first_name, last_name, region, role, email, password } = req.body;
	pool.query("SELECT * FROM users WHERE id=$1", [id]).then((result) => {
		if (result.rows.length === 0) {
			return res.status(400).json("We couldn't find ID!");
		} else {
			const query =
				"UPDATE users SET first_name=$2, last_name=$3, region=$4, role=$5, email=$6, password=$7 WHERE id=$1 RETURNING *";
			pool
				.query(query, [
					id,
					first_name,
					last_name,
					region,
					role,
					email,
					password,
				])
				.then(() =>
					res.json({ success: "User has been Updated!", user: result.rows[0] })
				)
				.catch((err) => console.error(err.message));
		}
	});
});

//DELETE a user with id
router.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM users WHERE id=$1 RETURNING *";
	pool
		.query(query, [id])
		.then((result) => {
			if (result.rowCount) {
				res.json({ success: "User has been deleted!", user: result.rows[0] });
			} else {
				res.status(404).json({ status: 404, msg: "Not found user!" });
			}
		})
		.catch((err) => console.error(err.message));
});

// GET all plans form specific user
router.get("/users/:user_id/plans", (req, res) => {
	const { user_id } = req.params;
	const query = "SELECT * FROM plans WHERE user_id=$1";
	pool
		.query(query, [user_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res.status(404).json({ status: 404, msg: "Not found plans!" });
			}
		})
		.catch((err) => console.error(err.message));
});

//POST a plan for specific user id
router.post("/users/:user_id/plans", (req, res) => {
	const { user_id } = req.params;
	const { description } = req.body;
	const query =
		"INSERT INTO plans (user_id, description ) VALUES ($1, $2) RETURNING *";
	pool
		.query(query, [user_id, description])
		.then((result) => {
			res.json({ success: "New plan has been created!", user: result.rows[0] });
		})
		.catch((err) => console.error(err.message));
});

// GET a plan form specific user with plan id
router.get("/users/:user_id/plans/:plan_id", (req, res) => {
	const { user_id, plan_id } = req.params;
	const query = "SELECT * FROM plans WHERE id=$1 and user_id=$2";

	pool
		.query(query, [plan_id, user_id])
		.then((result) => {
			console.log(result);
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res.status(404).json({
					status: 404,
					msg: "This user doesn't have a plan with this id",
				});
			}
		})
		.catch((err) => console.error(err.message));
});

//UPDATE a plan details with user id
router.put("/users/:user_id/plans/:plan_id", (req, res) => {
	const { user_id, plan_id } = req.params;
	const { description } = req.body;
	pool
		.query("SELECT * FROM plans WHERE user_id=$1 and id=$2", [user_id, plan_id])
		.then((result) => {
			if (result.rows.length === 0) {
				return res.status(400).json("We couldn't find user id!");
			} else {
				const query = "UPDATE plans SET description=$2 WHERE id=$1 RETURNING *";
				pool
					.query(query, [plan_id, description])
					.then(() =>
						res.json({ success: "plan has been Updated!", user: result.rows })
					)
					.catch((err) => console.error(err.message));
			}
		});
});

// Delete a plan form specific user with plan id <==== have a problem
router.delete("users/:user_id/plans/:plan_id", async (req, res) => {
	const { user_id, plan_id } = req.params;

	if (!user_id || !plan_id) {
		res
			.status(404)
			.json({ status: 404, msg: "We couldn't find a plan with this id!" });
	}

	try {
		const deleteGoal = await pool.query("DELETE FROM goals WHERE plan_id=$1", [
			plan_id,
		]);

		const deleteFeedback = await pool.query(
			"DELETE FROM feedbacks WHERE plan_id=$1",
			[plan_id]
		);

		const result = await pool.query(
			"DELETE FROM plans WHERE plans.id=$1 AND user_id=$2",
			[plan_id, user_id]
		);

		res.json({ Success: "Plan has been deleted" });
	} catch (err) {
		res.status(500).send("server error");
	}
});

// GET goals form specific user id
router.get("/users/:user_id/goals", (req, res) => {
	const { user_id } = req.params;
	const query = `SELECT p.id, p.user_id, p.description,ARRAY_AGG(g.title  || ' status:'|| g.status) goals_list
					FROM goals g INNER JOIN plans p on p.id=g.plan_id
					WHERE p.user_id=$1 GROUP BY p.id, p.user_id, p.description`;

	pool
		.query(query, [user_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res.status(404).json({
					status: 404,
					msg: "User doesn't have any goals.",
				});
			}
		})
		.catch((err) => console.error(err.message));
});

// GET a goal form specific plan id
router.get("/users/:user_id/plans/:plan_id/goals", (req, res) => {
	const { user_id, plan_id } = req.params;
	const query = `SELECT p.user_id, p.id plan_id, g.id goal_id,  g.title, g.status, g.start_date, g.end_date, g.create_date  FROM goals g 
						INNER JOIN plans p on p.id = g.plan_id where p.user_id = $1 and g.plan_id=$2`;
	pool
		.query(query, [user_id, plan_id])
		.then((result) => {
			if (result.rowCount) {
				res.json(result.rows);
			} else {
				res.status(404).json({
					status: 404,
					msg: "This user doesn't have a goal with this id",
				});
			}
		})
		.catch((err) => console.error(err.message));
});

//POST a goal for specific plan id
router.post("/users/plans/:plan_id/goals", (req, res) => {
	const { plan_id } = req.params;
	const { title, status, start_date, end_date } = req.body;
	const query =
		"INSERT INTO goals ( plan_id, title, status, start_date, end_date ) VALUES ($1, $2, $3, $4, $5) RETURNING *";
	pool
		.query(query, [plan_id, title, status, start_date, end_date])
		.then((result) => {
			res.json({ success: "New plan has been created!", user: result.rows[0] });
		})
		.catch((err) => console.error(err.message));
});

//DELETE a goal for specific plan id
router.delete("/users/plans/:plan_id/goals/:goal_id", (req, res) => {
	const { plan_id, goal_id } = req.params;
	pool
		.query("SELECT * FROM goals WHERE plan_id = $1 and id = $2", [
			plan_id,
			goal_id,
		])
		.then(() => {
			pool
				.query("DELETE FROM goals WHERE id=$1", [goal_id])
				.then(() => res.send(`goal ${goal_id} has been deleted!`))
				.catch((e) => console.error(e));
		})
		.catch((err) => console.error(err.message));
});

// GET all tasks form specific goal id
router.get(
	"/users/:user_id/plans/:plan_id/goals/:goal_id/tasks",
	(req, res) => {
		const { user_id, plan_id, goal_id } = req.params;
		const query = `SELECT t.id, t.goal_id goal_id, t.description, t.status, t.create_date  FROM tasks t 
						INNER JOIN goals g on t.goal_id = g.id 
						INNER JOIN plans p on g.plan_id = p.id 
						where p.user_id =$1 and p.id= $2 and t.goal_id=$3`;
		pool
			.query(query, [user_id, plan_id, goal_id])
			.then((result) => {
				if (result.rowCount) {
					res.json(result.rows);
				} else {
					res.status(404).json({
						status: 404,
						msg: "This user doesn't have a goal with this id",
					});
				}
			})
			.catch((err) => console.error(err.message));
	}
);

// GET all feedbacks form specific user id
router.get("/users/:user_id/feedbacks", async (req, res) => {
	const { user_id } = req.params;
	try {
		const feedback_req = await pool.query(
			`SELECT graduate.first_name, graduate.id, p.description, f.description, f.id, mentors.first_nameFROM feedbacks as f 
				INNER JOIN plans  as p ON p.id = f.plan_id INNER JOIN users as graduate ON graduate.id = p.user_id
				INNER JOIN users as mentors ON f.user_id= mentors.id where mentors.id = $1
					ORDER BY f.create_date`,
			[user_id]
		);
		res.json(feedback_req.rows);
	} catch (err) {
		res.status(500).json("server error");
	}
});

// POST feedback form specific user id (mentor)
router.post("/users/:user_id/feedbacks", async (req, res) => {
	const { id } = req.body;
	const { user_id } = req.params;

	try {
		await pool.query(
			"INSERT INTO feedbacks(plan_id, user_id) VALUES ($1,$2)",
			[id, user_id]
		);

		res.json("feedback send successfully");
	} catch (err) {
		res.status(500).json(err, "server error");
	}
});

// UPDATE feedback form specific user id (mentor) and user plan_id
router.put("/users/:user_id/:plan_id/feedbacks", async (req, res) => {
	const { description } = req.body;
	const { plan_id, user_id } = req.params;

	try {
		await pool.query(
			"UPDATE feedbacks SET description=$1 WHERE plan_id=$2 AND users_id=$3",
			[description, plan_id, user_id]
		);

		res.json("feedback send successfully");
	} catch (err) {
		res.status(500).send(err, "server error");
	}
});

// GET all feedbacks form specific user id
router.get("/users/:user_id/feedbacks", async (req, res) => {
	try {
		const feedbacks = await pool.query("",[req.params.user_id]);
		res.json(feedbacks.rows);
	} catch (err) {
		res.status(500).send(err, "server error");
	}
});

// PUT a feedback from specific plan id
router.put("/user/:user_id/:plan_id/feedbacks", async (req, res) => {
	const { description } = req.body;
	const { user_id, plan_id } = req.params;

	try {
		const result = await pool.query(
			"UPDATE feedbacks SET description=$1 WHERE plan_id=$2 and user_id= $3 RETURNING *",
			[description, plan_id, user_id]
		);

		res.json(result.rows);
	} catch (err) {
		res.status(500).send(err, "server error");
	}
});

export default router;
