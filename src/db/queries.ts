import pool from "./pool";

async function insertUser(email: string, admin: boolean) {
  await pool.query(
    `
	INSERT INTO users (email,admin) VALUES ($1, $2)
	`,
    [email, admin]
  );
}
