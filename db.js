import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
	uri: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});
