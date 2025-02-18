require("dotenv").config();

describe("As Rotas Funcionam", () => {
  it("Index retorna o status 200", async () => {
    const result = await fetch(`http://localhost:${process.env.PORT}/`);

    expect(result.status).toBe(200);
  });

  it("O login ocorre corretamente", () => {});

  it("Rota user retorna dados sobre");
});
