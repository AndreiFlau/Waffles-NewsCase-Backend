import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../db/userQueries";
import dotenv from "dotenv";
dotenv.config();

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const loginWithEmail = asyncHandler(async (req, res) => {
  try {
    const email = String(req.body.email).toLowerCase();
    if (!email || !isValidEmail(email)) {
      res.status(400).json({ message: "Email inválido" });
      return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({ message: "Usuário não existe" });
    } else {
      const jwtToken = jwt.sign({ userId: user.id }, process.env.SECRETJWTPASS || "segredo", { expiresIn: "1h" });
      const formattedUser = { ...user, jwtToken };

      res.status(200).json(formattedUser);
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao logar: ${err.message || err}`);
  }
});

export default loginWithEmail;
