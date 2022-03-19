import { config } from "dotenv";

config();

export const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
export const ADMIN_NAME = process.env.ADMIN_NAME || "admin";
export const ADMIN_PASS = process.env.ADMIN_PASS || "admin";
