import { Router } from "express";
import {
  getAllEmailStats,
  getAllEmailStatsByUserId,
  getAllUsers,
  getEmailStatsById,
  getNewsletterByDate,
  getNewsletterOpenCount,
  getStreakRank,
  getStreakStats,
} from "../controllers/dashboardController";
const dashboardRouter = Router();

dashboardRouter.get("/stats", getAllEmailStats);
dashboardRouter.get("/stats/user/:userId", getAllEmailStatsByUserId);
dashboardRouter.get("/stats/:statId", getEmailStatsById);
dashboardRouter.get("/users", getAllUsers);
dashboardRouter.get("/streakrank", getStreakRank);
dashboardRouter.get("/newsletterviews", getNewsletterOpenCount);
dashboardRouter.get("/newsletterstatsbydate", getNewsletterByDate);
dashboardRouter.get("/streakstats", getStreakStats);

export default dashboardRouter;
