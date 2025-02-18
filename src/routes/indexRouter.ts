import { Router, Request, Response, NextFunction } from "express";
const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Hey");
});

export default indexRouter;
