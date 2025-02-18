import { Router, Request, Response, NextFunction } from "express";

async function authUser(req: Request, res: Response, next: NextFunction) {
  next();
}
