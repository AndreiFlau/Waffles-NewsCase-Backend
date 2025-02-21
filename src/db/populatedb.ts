import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	email VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT NOW(),
	admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS streaks (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	current_streak INT DEFAULT 0,
	longest_streak INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT unique_streak UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS email_stats (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	newsletter_id VARCHAR(255) NOT NULL,
	opened_at TIMESTAMP DEFAULT NOW(),
	utm_source VARCHAR(255),
	utm_medium VARCHAR(255),
	utm_campaign VARCHAR(255),
	utm_channel VARCHAR(255),
	CONSTRAINT unique_email_open UNIQUE (user_id, newsletter_id, opened_at)
);

CREATE TABLE IF NOT EXISTS badges (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS user_badges (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	badge_id INT REFERENCES badges(id) ON DELETE CASCADE,
	earned_at TIMESTAMP DEFAULT NOW(),
	UNIQUE (user_id, badge_id)
);

INSERT INTO users (email) VALUES
('user1@example.com'),
('user2@example.com'),
('user3@example.com'),
('user4@example.com'),
('user5@example.com'),
('user6@example.com'),
('user7@example.com'),
('user8@example.com'),
('user9@example.com'),
('user10@example.com');

INSERT INTO streaks (user_id, current_streak, longest_streak)
SELECT id, 
	CASE 
		WHEN id % 3 = 0 THEN 35
		WHEN id % 2 = 0 THEN 15
		ELSE 7
	END AS current_streak,
	CASE 
		WHEN id % 3 = 0 THEN 35
		WHEN id % 2 = 0 THEN 20
		ELSE 10
	END AS longest_streak
FROM users;

INSERT INTO email_stats (user_id, newsletter_id, utm_source, utm_medium, utm_campaign)
SELECT id, 'post_1', 'email', 'newsletter', 'daily_digest' 
FROM users;

INSERT INTO email_stats (user_id, newsletter_id, utm_source, utm_medium, utm_campaign)
SELECT id, 'post_2', 'email', 'newsletter', 'daily_digest' 
FROM users;

INSERT INTO email_stats (user_id, newsletter_id, utm_source, utm_medium, utm_campaign)
SELECT id, 'post_3', 'email', 'newsletter', 'daily_digest' 
FROM users;

INSERT INTO user_badges (user_id, badge_id)
SELECT s.user_id, b.id
FROM streaks s
CROSS JOIN badges b
WHERE 
    (b.title = 'Leitor' AND s.current_streak >= 7) OR
    (b.title = 'Leitor De Ouro' AND s.current_streak >= 30);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
