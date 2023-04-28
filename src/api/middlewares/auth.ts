import jwt from "jsonwebtoken";
import ExpressError from "../utils/ExpressError";
import config from "../../config/vars";
import { Response, NextFunction } from "express";

export const auth = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) throw new ExpressError("Access denied...", 401);
  try {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ExpressError("Invalid Token", 400);
  }
};
