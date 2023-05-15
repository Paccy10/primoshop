import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler";
import User from "../models/user.model";
import { UserDocument } from "../interfaces/user.interface";

export interface CustomRequest extends Request {
  user: UserDocument | null;
}

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          `${process.env.SECRET_KEY}`
        ) as JwtPayload;

        req.user = await User.findById(decoded.userId).select("-password");

        return next();
      } catch (error) {
        res.status(401);
        throw new Error("Unauthorized! Invalid token");
      }
    }

    res.status(401);
    throw new Error("Unauthorized! No token");
  }
);

export const admin = asyncHandler(
  (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      return next();
    }

    res.status(403);
    throw new Error("Unauthorized! Not admin");
  }
);
