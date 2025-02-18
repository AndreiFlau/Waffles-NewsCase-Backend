import pool from "./pool";

async function getStreak(id: number) {
  const result = await pool.query(
    `
	SELECT * FROM streaks WHERE id = ($1)
	`,
    [id]
  );

  const streak = result.rows[0];
  return {
    id: streak.id,
    userId: streak.user_id,
    currentStreak: streak.current_streak,
    longestStreak: streak.longest_streak,
    createdAt: streak.created_at,
    updatedAt: streak.updated_at,
  };
}

async function createStreak(userId: number) {
  await pool.query(
    `
	INSERT INTO streaks (userId) VALUES ($1)
	`,
    [userId]
  );
}

export { getStreak, createStreak };
