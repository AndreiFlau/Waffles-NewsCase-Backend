import pool from "./pool";

async function getEmailStats(id: number) {
  const result = await pool.query(
    `
	SELECT * FROM email_stats WHERE id = ($1)
	`,
    [id]
  );

  const emailStats = result.rows[0];
  return {
    id: emailStats.id,
    userId: emailStats.user_id,
    newsletterId: emailStats.newsletter_id,
    openedAt: emailStats.opened_at,
    utmSource: emailStats.utm_source,
    utmMedium: emailStats.utm_medium,
    utmCampaign: emailStats.utm_campaign,
    utmChannel: emailStats.utm_channel,
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

export { getEmailStats, createEmailStats };
