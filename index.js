import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

const app = express();
app.use(
	cors({
		origin: "*"
	})
);
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("API Rodando");
});

app.get("/habits", async (req, res) => {
	const [rows] = await db.execute("SELECT * FROM habits");
	res.json(rows);
});

app.post("/habits", async (req, res) => {
	const { name } = req.body;

	const [result] = await db.execute("INSERT INTO habits (name, streak, lastCompletedDate) VALUES (?,?,?)", [name, 0, null]);

	res.json({
		id: result.insertId,
		name,
		streak: 0
	});
});

app.patch("/habits/:id/complete", async (req, res) => {
	const { id } = req.params;

	const [rows] = await db.execute("SELECT * FROM habits WHERE id = ?", [id]);

	if (rows.length === 0) {
		return res.status(404).json({ error: "Habit not found" });
	}

	const habit = rows[0];

	const today = new Date().toISOString().split("T")[0];

	const yesterDay = new Date();
	yesterDay.setDate(yesterDay.getDate() - 1);
	const yesterDayStr = yesterDay.toISOString().split("T")[0];

	let newStreak = habit.streak;

	const lastDate = habit.lastCompletedDate ? habit.lastCompletedDate.toISOString().split("T")[0] : null;

	if (lastDate === today) {
		return res.json(habit);
	}

	if (lastDate === yesterDayStr) {
		habit.streak += 1;
	} else {
		habit.streak = 1;
	}

	await db.execute("UPDATE habits SET streak = ?, lastCompletedDate = ? WHERE id = ?", [newStreak, today, id]);

	res.json({
		...habit,
		streak: newStreak,
		lastCompletedDate: today
	});
});

app.delete("/habits/:id", async (req, res) => {
	const { id } = req.params;

	await db.execute("DELETE FROM habits WHERE id = ?", [id]);

	res.json({ success: true });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
