// const { Client } = require("pg");
// require("dotenv").config();

// describe("Base De Dados Funciona", () => {
//   let client;

//   beforeAll(async () => {
//     client = new Client({
//       connectionString: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     });
//     await client.connect();

//     //Deleta o conteúdo das tabelas para o teste
//     await client.query("DELETE FROM email_stats");
//     await client.query("DELETE FROM streaks");
//     await client.query("DELETE FROM users");
//   });

//   afterAll(async () => {
//     await client.end();
//   });

//   it("cria um usuário e o retorna", async () => {
//     const userResult = await client.query("INSERT INTO users (email) VALUES ($1) RETURNING id, email", ["test@example.com"]);
//     const user = userResult.rows[0];

//     expect(user.email).toBe("test@example.com");
//     expect(user.id).toBeDefined();
//   });

//   it("cria uma streak", async () => {
//     const userResult = await client.query("INSERT INTO users (email) VALUES ($1) RETURNING id", ["test2@example.com"]);
//     const userId = userResult.rows[0].id;

//     const streakResult = await client.query(
//       `
// 			INSERT INTO streaks (user_id, current_streak, longest_streak)
// 			VALUES ($1, $2, $3)
// 			RETURNING *
// 		`,
//       [userId, 1, 1]
//     );

//     const streak = streakResult.rows[0];
//     expect(streak.user_id).toBe(userId);
//     expect(streak.current_streak).toBe(1);
//   });

//   it("salva as estátisticas do email", async () => {
//     const userResult = await client.query("INSERT INTO users (email) VALUES ($1) RETURNING id", ["test3@example.com"]);
//     const userId = userResult.rows[0].id;

//     const statsResult = await client.query(
//       `
// 			INSERT INTO email_stats (
// 				user_id,
// 				newsletter_id,
// 				utm_source,
// 				utm_medium,
// 				utm_campaign,
// 				utm_channel
// 			)
// 			VALUES ($1, $2, $3, $4, $5, $6)
// 			RETURNING *
// 		`,
//       [userId, "123", "email", "newsletter", "test", "test"]
//     );

//     const stats = statsResult.rows[0];
//     expect(stats.newsletter_id).toBe("123");
//     expect(stats.user_id).toBe(userId);
//   });
// });
