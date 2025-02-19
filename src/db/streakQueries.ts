import pool from "./pool";

async function getAllStreaksQuery() {
  const result = await pool.query(
    `
	SELECT * FROM streaks 
	`
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

async function getStreakByIdQuery(id: number) {
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

async function getStreakByUserIdQuery(userId: number) {
  const result = await pool.query(
    `
	SELECT * FROM streaks WHERE user_id = ($1)
	`,
    [userId]
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

async function createStreak(userId: number, count?: number) {
  if (!count) {
    await pool.query(
      `
		INSERT INTO streaks (user_id, current_streak, longest_streak) VALUES ($1, 1 ,1)
		`,
      [userId]
    );
  } else {
    await pool.query(
      `
			INSERT INTO streaks (user_id, current_streak, longest_streak) 
			VALUES ($1, $2, $3)
			`,
      [userId, count, count]
    );
  }
}

async function updateStreak(userId: number, count: number) {
  await pool.query(
    `
		UPDATE streaks SET current_streak = ($2), longest_streak = GREATEST(longest_streak, $2), updated_at = NOW() WHERE user_id = ($1)
		`,
    [userId, count]
  );
}

export { getAllStreaksQuery, getStreakByIdQuery, getStreakByUserIdQuery, createStreak, updateStreak };
