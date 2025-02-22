import { Router } from "express";
import { getMyBadges, getMyNewsletterHistory } from "../controllers/userController";
const userRouter = Router();

userRouter.get("/newsletter", getMyNewsletterHistory);
userRouter.get("/badges", getMyBadges);

export default userRouter;
