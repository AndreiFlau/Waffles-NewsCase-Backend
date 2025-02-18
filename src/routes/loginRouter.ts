import { Router } from "express";
import loginWithEmail from "../controllers/loginController";
const loginRouter = Router();

loginRouter.post("/", loginWithEmail);

export default loginRouter;
