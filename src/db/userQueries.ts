import pool from "./pool";

async function getUserById(id: number) {
  const result = await pool.query(
    `
	SELECT * FROM users WHERE id = ($1)
	`,
    [id]
  );

  const user = result.rows[0];
  return {
    id: user.id,
    email: user.email,
    createdAt: user.created_at,
    admin: user.admin,
  };
}

async function getUserByEmail(email: string) {
  const result = await pool.query(
    `
	SELECT * FROM users WHERE email = ($1)
	`,
    [email]
  );

  const user = result.rows[0];
  return {
    id: user.id,
    email: user.email,
    createdAt: user.created_at,
    admin: user.admin,
  };
}

async function createUser(email: string, admin: boolean) {
  const result = await pool.query(
    `
	INSERT INTO users (email,admin) VALUES ($1, $2)
	RETURNING *
	`,
    [email, admin]
  );

  const user = result.rows[0];
  return {
    id: user.id,
    email: user.email,
    createdAt: user.created_at,
    admin: user.admin,
  };
}

export { getUserById, getUserByEmail, createUser };
