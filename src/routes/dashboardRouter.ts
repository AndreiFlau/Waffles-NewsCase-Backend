import { Router } from "express";
import { getAllEmailStats, getAllEmailStatsByUserId, getEmailStatsById } from "../controllers/dashboardController";
const dashboardRouter = Router();

dashboardRouter.get("/stats", getAllEmailStats);
dashboardRouter.get("/stats/user/:userId", getAllEmailStatsByUserId);
dashboardRouter.get("/stats/:statId", getEmailStatsById);

export default dashboardRouter;
