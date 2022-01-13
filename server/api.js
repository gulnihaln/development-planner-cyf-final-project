import { Router } from "express";
const { Pool } = require("pg");

const router = new Router();
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "dev_planner",
	password: "",
	port: 5432,
});

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/users", (_, res) => {
	pool.query("SELECT * FROM users", (error, result) => {
		res.json(result.rows);
	});
});

router.get("/plans", (_, res) => {
	pool.query("SELECT * FROM plans", (error, result) => {
		res.json(result.rows);
	});
});

router.get("/feedbacks", (_, res) => {
	pool.query("SELECT * FROM feedbacks", (error, result) => {
		res.json(result.rows);
	});
});

router.get("/goals", (_, res) => {
	pool.query("SELECT * FROM goals", (error, result) => {
		res.json(result.rows);
	});
});

router.get("/tasks", (_, res) => {
	pool.query("SELECT * FROM tasks", (error, result) => {
		res.json(result.rows);
	});
});

router.post("/register", async (req, res) => {
	try {
		console.log(req.body);
		const { first_name, last_name, region, role, email, password } = req.body;
		const newUser = await pool.query(
			"INSERT INTO users (first_name, last_name, region, role, email, password ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[first_name, last_name, region, role, email, password]
);
res.json(newUser.rows[0]);
} catch (err) {
console.error(err.message);
}
});

router.get("/users/:id", async (req, res) => {
	try {
		console.log(req.body);
		const { id } = req.params;
		const users = await pool.query(
			"SELECT * FROM users WHERE id = $1",
			[id]
		);
		res.json(users.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

router.get("/users/:id/plans", async (req, res) => {
	try {
		console.log(req.body);
		const { id } = req.params;
		const plans = await pool.query(
			"SELECT * FROM plans WHERE user_id = $1", [id]);
		res.json(plans.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

router.get("/users/:id/:plan_id", async (req, res) => {
	try {
		console.log(req.body);
		const { id, plan_id } = req.params;
		const goals = await pool.query("SELECT * FROM plans WHERE user_id = $1 AND plan_id = $2", [id, plan_id]);
		res.json(goals.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});




export default router;
