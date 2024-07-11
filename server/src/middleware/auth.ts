import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.locals.loginSession = decoded;

    res.locals.user = (decoded as { id: number }).id;

    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
