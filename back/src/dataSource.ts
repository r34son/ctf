import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER || "user",
  password: process.env.DB_PASS || "pass",
  database: process.env.DB_NAME || "db",
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
