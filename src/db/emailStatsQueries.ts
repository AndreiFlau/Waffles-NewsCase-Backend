import pool from "./pool";

async function getAllEmailStatsQuery() {
  const result = await pool.query(
    `
	SELECT e.*, u.email 
	FROM email_stats e
	JOIN users u ON e.user_id = u.id
	`
  );

  const emailStats = result.rows;

  const formattedStats = emailStats.map((stat) => {
    const {
      id,
      user_id: userId,
      email,
      newsletter_id: newsletterId,
      opened_at: openedAt,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_channel: utmChannel,
    } = stat;

    return {
      id,
      userId,
      email,
      newsletterId,
      openedAt,
      utmSource,
      utmMedium,
      utmCampaign,
      utmChannel,
    };
  });
  return {
    formattedStats,
  };
}

async function getEmailStatsByIdQuery(id: number) {
  const result = await pool.query(
    `
	SELECT e.*, u.email 
	FROM email_stats e
	JOIN users u ON e.user_id = u.id 
	WHERE e.id = ($1)
	`,
    [id]
  );

  const emailStats = result.rows[0];
  return {
    id: emailStats.id,
    userId: emailStats.user_id,
    email: emailStats.email,
    newsletterId: emailStats.newsletter_id,
    openedAt: emailStats.opened_at,
    utmSource: emailStats.utm_source,
    utmMedium: emailStats.utm_medium,
    utmCampaign: emailStats.utm_campaign,
    utmChannel: emailStats.utm_channel,
  };
}

async function getEmailStatsByUserIdQuery(userId: number) {
  const result = await pool.query(
    `
	SELECT e.*, u.email
	FROM email_stats e
	JOIN users u ON e.user_id = u.id
	WHERE u.id = ($1)
	`,
    [userId]
  );

  const emailStats = result.rows;

  const formattedStats = emailStats.map((stat) => {
    const {
      id,
      user_id: userId,
      email,
      newsletter_id: newsletterId,
      opened_at: openedAt,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_channel: utmChannel,
    } = stat;

    return {
      id,
      userId,
      email,
      newsletterId,
      openedAt,
      utmSource,
      utmMedium,
      utmCampaign,
      utmChannel,
    };
  });
  return {
    formattedStats,
  };
}

async function getNewsletterOpenCountQuery() {
  const result = await pool.query(
    `
SELECT 
		e.newsletter_id, 
		COUNT(e.opened_at) AS times_opened
FROM email_stats e
GROUP BY e.newsletter_id
ORDER BY times_opened DESC;
	`,
    []
  );

  const stats = result.rows;

  const formattedStats = stats.map((stat) => {
    const { newsletter_id: newsletterId, times_opened: timesOpened } = stat;

    return {
      newsletterId,
      timesOpened,
    };
  });
  return {
    formattedStats,
  };
}

async function getNewsletterStatsByDateQuery(days: number) {
  const result = await pool.query(
    `
SELECT DATE(opened_at) AS day, COUNT(*) AS times_opened
FROM email_stats
WHERE opened_at >= NOW() - INTERVAL '1 DAY' * ($1)
GROUP BY day
ORDER BY day ASC;
	`,
    [days]
  );

  const stats = result.rows;

  const formattedStats = stats.map((stat) => {
    const { day, times_opened: timesOpened } = stat;

    return {
      day,
      timesOpened,
    };
  });
  return {
    formattedStats,
  };
}

async function createEmailStats(
  userId: number,
  newsletterId: number,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string,
  utmChannel?: string
) {
  await pool.query(
    `
		INSERT INTO email_stats (
			user_id,
			newsletter_id,
			utm_source,
			utm_medium,
			utm_campaign,
			utm_channel
		) VALUES ($1, $2, $3, $4, $5, $6)
		`,
    [userId, newsletterId, utmSource, utmMedium, utmCampaign, utmChannel]
  );
}

export {
  getAllEmailStatsQuery,
  getEmailStatsByIdQuery,
  getEmailStatsByUserIdQuery,
  createEmailStats,
  getNewsletterOpenCountQuery,
  getNewsletterStatsByDateQuery,
};
