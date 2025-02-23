import dotenv from "dotenv";
dotenv.config();

describe("Testes das Rotas do Usuário", () => {
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

  it("Deve retornar as newsletter relacionadas ao usuário", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/user/newsletter`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(Array.isArray(data.formattedStats)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("userId");
      expect(data[0]).toHaveProperty("email");
      expect(data[0]).toHaveProperty("newsletterId");
    }
  });

  it("Deve retornar os badges", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/user/badges`, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toBe(200);
    const data = await result.json();
    expect(Array.isArray(data.formattedStats)).toBe(true);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty("title");
      expect(data[0]).toHaveProperty("earnedAt");
    }
  });

  it("Deve falhar ao acessar dados sem autenticação", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/user/badges`);

    expect(result.status).toBe(403);
  });
});
