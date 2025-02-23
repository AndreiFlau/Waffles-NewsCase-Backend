import dotenv from "dotenv";
dotenv.config();

describe("As Rotas Funcionam", () => {
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

  it("Index retorna o status 200", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/`);

    expect(result.status).toBe(200);
  });

  it("O login falha com credenciais inválidas", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "invalid@email.com",
        password: "wrongpass",
      }),
    });

    expect(result.status).toBe(400);
  });

  it("O webhook rejeita requisições sem payload", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/webhook`, {
      method: "POST",
    });

    expect(result.status).toBe(400);
  });

  it("A rota de usuários requer autenticação", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/users`, {
      headers: {
        Authorization: "Bearer invalid_token",
      },
    });

    expect(result.status).toBe(403);
  });

  it("A busca de usuário por ID funciona", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/dashboard/users`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    expect(result.status).toBe(200);
  });
});
