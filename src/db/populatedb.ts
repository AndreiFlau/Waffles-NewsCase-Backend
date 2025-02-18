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

INSERT INTO users (email, admin) VALUES ('admin@thenews.digital', true);

INSERT INTO streaks (user_id, current_streak, longest_streak)
SELECT id, 40, 40 FROM users WHERE email = 'admin@thenews.digital';

INSERT INTO badges (title, description) VALUES 
('Leitor', 'Leu nossas notícias por 7 dias!'),
('Leitor De Ouro', 'Leu nossas notícias por mais de 30 dias!');

INSERT INTO user_badges (user_id, badge_id)
SELECT u.id, b.id 
FROM users u 
CROSS JOIN badges b 
WHERE u.email = 'admin@thenews.digital';
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
