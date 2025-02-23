import dotenv from "dotenv";
dotenv.config();

describe("Testes das Rotas de Streak", () => {
  let token: string;

  beforeAll(async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: process.env.TESTEMAIL,
      }),
    });

    const user = await result.json();
    token = user.jwtToken;
  });

  it("Deve retornar todas as streaks", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/streaks`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("currentStreak");
    expect(data).toHaveProperty("longestStreak");
  });

  it("Deve retornar a média das streaks", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/streaks/average`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("streaksAvg");
  });

  it("Deve retornar a streak do usuário logado", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/streaks/me`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("userId");
    expect(data).toHaveProperty("currentStreak");
    expect(data).toHaveProperty("longestStreak");
  });

  it("Deve falhar ao acessar streak sem autenticação", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/streaks/me`);

    expect(result.status).toBe(403);
  });
});
