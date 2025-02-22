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

async function getStreakRankQuery() {
  const result = await pool.query(
    `
	SELECT s.*, u.email
	FROM streaks s
	JOIN users u ON s.user_id = u.id
	ORDER BY s.current_streak DESC
	LIMIT 10;
	`
  );

  const streaks = result.rows;

  const formattedStats = streaks.map((streak) => {
    const { id, email, user_id, current_streak, longest_streak, created_at, updated_at } = streak;
    return {
      id: id,
      email,
      userId: user_id,
      currentStreak: current_streak,
      longestStreak: longest_streak,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  });
  return formattedStats;
}

async function getStreaksAvgQuery() {
  const result = await pool.query(
    `
	SELECT AVG(current_streak) FROM streaks 
	`
  );

  const streak = result.rows[0];
  return {
    streaksAvg: streak.avg,
  };
}

async function getStreakStatsQuery() {
  const result = await pool.query(
    `
	SELECT 
	CASE 
		WHEN current_streak >= 30 THEN 'Lendário (30+)'
		WHEN current_streak >= 7 THEN 'Engajado (7-29)'
		WHEN current_streak >= 1 THEN 'Novo (1-6)'
		ELSE 'Inativo'
	END AS streak_category,
	COUNT(*) AS total_users
	FROM streaks
	GROUP BY streak_category
	ORDER BY total_users DESC;
	`
  );

  const streaks = result.rows;

  const formattedStats = streaks.map((streak) => {
    const { streak_category: streakCategory, total_users: totalUsers } = streak;
    return {
      streakCategory,
      totalUsers,
    };
  });
  return formattedStats;
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
  if (!streak) {
    return false;
  }

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

export {
  getAllStreaksQuery,
  getStreakByIdQuery,
  getStreakByUserIdQuery,
  createStreak,
  updateStreak,
  getStreaksAvgQuery,
  getStreakRankQuery,
  getStreakStatsQuery,
};
