import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

(async () => {
  try {
    await createConnection();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());

    app.use("/", require("@/routes").default);

    app.listen(80);

    console.log("Express server has started.");
  } catch (error) {
    console.log(error);
  }
})();
