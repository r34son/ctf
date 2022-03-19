import { TokenData } from "@/consts";
import { StatusCodes } from "@/consts/statusCodes";
import { JWT_SECRET } from "@/consts/env";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/** Middleware to check whether user is authenticated. */
export const jwtAuth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Authorization header is not provided" });
    }

    const token = authorizationHeader.toLowerCase().startsWith("bearer")
      ? authorizationHeader.slice("bearer".length).trim()
      : authorizationHeader;

    const decodedToken = jwt.verify(token, JWT_SECRET) as TokenData;
    if (decodedToken.id) response.locals.id = decodedToken.id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Expired token" });
    }

    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to authenticate user" });
  }
};

/** Middleware to check whether user is admin. */
export const isAdmin = (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!response.locals.id) next();
  else response.sendStatus(StatusCodes.FORBIDDEN);
};
