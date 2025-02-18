import { Router } from "express";
import processWebhook from "../controllers/webhookController";
const webhookRouter = Router();

webhookRouter.post("/webhook", processWebhook);

export default webhookRouter;
