import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "user",
  password: "pass",
  database: "db",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
