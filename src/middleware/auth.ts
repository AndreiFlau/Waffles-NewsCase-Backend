import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function authJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.replace("bearer", "");

  if (!token) {
    res.status(403).send("Acesso Negado");
    return;
  }

  jwt.verify(token, process.env.SECRETJWTPASS || "segredo", (error, user) => {
    if (error) {
      res.status(403).send("Token Inválido");
      return;
    }

    req.user = user;

    next();
  });
}

//Middleware para evitar que usuários acessem quaisquer outros dados
function checkUserAccess(req: Request, res: Response, next: NextFunction) {
  if (req.user.userId !== req.params.userId && !req.user.isAdmin) {
    res.status(403).json({ message: "Não Autorizado" });
    return;
  }
  next();
}

function authAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ message: "Não Autorizado" });
    return;
  }

  if (!req.user.admin) {
    res.status(401).json({ message: "Não Autorizado" });
    return;
  }
  next();
}

export { authJWT, authAdmin, checkUserAccess };
