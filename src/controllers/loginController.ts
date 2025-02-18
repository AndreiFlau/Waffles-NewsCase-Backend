import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../db/userQueries";
import dotenv from "dotenv";
dotenv.config();

const loginWithEmail = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(400).json({ message: "Usuário não existe" });
    } else {
      const jwtToken = jwt.sign({ userId: user.id }, process.env.SECRETJWTPASS || "segredo", { expiresIn: "1h" });
      const formattedUser = { ...user, jwtToken };

      res.json(formattedUser);
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).send(`Erro ao logar: ${err.message || err}`);
  }
});

export default loginWithEmail;
