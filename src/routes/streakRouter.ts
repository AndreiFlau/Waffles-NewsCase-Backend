import { Router } from "express";
import { getAllStreaks, getMyStreak, getStreakAverage, getStreakById, getStreakByUserId } from "../controllers/streakController";
import { authAdmin } from "../middleware/auth";
const streakRouter = Router();

streakRouter.get("/", authAdmin, getAllStreaks);
streakRouter.get("/average", authAdmin, getStreakAverage);
streakRouter.get("/user/:userId", authAdmin, getStreakByUserId);
streakRouter.get("/me", getMyStreak);
streakRouter.get("/:streakId", authAdmin, getStreakById);

export default streakRouter;
