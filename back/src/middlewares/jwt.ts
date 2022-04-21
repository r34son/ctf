import { StatusCodes } from "@/consts/statusCodes";
import { AppSocket } from "@/interfaces/socket";
import { TokenService } from "@/services/jwt";
import { NextFunction, Request, Response } from "express";

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

    const decodedToken = TokenService.verifyAccessToken(token);
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

/** Middleware to check whether socket is authenticated. */
export const socketIoJwtAuth = (socket: AppSocket, next) => {
  const { token } = socket.handshake.auth;
  if (token) {
    try {
      socket.data = TokenService.verifyAccessToken(token);
      next();
    } catch (error) {
      next(new Error(error.name || "Authentication error"));
    }
  } else {
    next(new Error("Authentication error"));
  }
};
