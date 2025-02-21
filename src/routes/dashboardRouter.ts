import { Router } from "express";
import {
  getAllEmailStats,
  getAllEmailStatsByUserId,
  getAllUsers,
  getEmailStatsById,
  getStreakRank,
} from "../controllers/dashboardController";
const dashboardRouter = Router();

dashboardRouter.get("/stats", getAllEmailStats);
dashboardRouter.get("/stats/user/:userId", getAllEmailStatsByUserId);
dashboardRouter.get("/stats/:statId", getEmailStatsById);
dashboardRouter.get("/users", getAllUsers);
dashboardRouter.get("/streakrank", getStreakRank);

export default dashboardRouter;
