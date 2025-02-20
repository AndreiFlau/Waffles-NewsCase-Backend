import { Router } from "express";
import { getMyNewsletterHistory } from "../controllers/userController";
const userRouter = Router();

userRouter.get("/newsletter", getMyNewsletterHistory);

export default userRouter;
