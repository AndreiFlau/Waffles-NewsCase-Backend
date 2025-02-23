import dotenv from "dotenv";
dotenv.config();

describe("Testes das Rotas do Dashboard", () => {
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

  it("Deve retornar todas as estatísticas de email", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/stats`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("formattedStats");
    expect(Array.isArray(data.formattedStats)).toBe(true);
    if (data.formattedStats.length > 0) {
      expect(data.formattedStats[0]).toHaveProperty("id");
      expect(data.formattedStats[0]).toHaveProperty("userId");
      expect(data.formattedStats[0]).toHaveProperty("email");
      expect(data.formattedStats[0]).toHaveProperty("newsletterId");
    }
  });

  it("Deve retornar as estatísticas de email por usuário", async () => {
    const userId = 1;
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/stats/user/${userId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("formattedStats");
  });

  it("Deve retornar o ranking de streaks", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/streakrank`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty("email");
      expect(data[0]).toHaveProperty("currentStreak");
      expect(data[0]).toHaveProperty("longestStreak");
    }
  });

  it("Deve retornar as visualizações das newsletters", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/newsletterviews`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("formattedStats");
    if (data.formattedStats.length > 0) {
      expect(data.formattedStats[0]).toHaveProperty("newsletterId");
      expect(data.formattedStats[0]).toHaveProperty("timesOpened");
    }
  });

  it("Deve retornar estatísticas da newsletter por data", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/newsletterstatsbydate?days=7`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(data).toHaveProperty("formattedStats");
    if (data.formattedStats.length > 0) {
      expect(data.formattedStats[0]).toHaveProperty("day");
      expect(data.formattedStats[0]).toHaveProperty("timesOpened");
    }
  });

  it("Deve retornar estatísticas de streak", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/streakstats`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty("streakCategory");
      expect(data[0]).toHaveProperty("totalUsers");
    }
  });

  it("Deve falhar ao acessar dados sem autenticação", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/stats`);
    expect(result.status).toBe(403);
  });

  it("Deve retornar erro com query days inválida", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/newsletterstatsbydate?days=invalid`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(400);
    const data = await result.json();
    expect(data).toHaveProperty("message");
  });
});
