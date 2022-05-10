import { Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response
) => response.status(500).json({ error: error.message });
