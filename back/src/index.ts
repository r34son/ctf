import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { errorHandler } from "./middlewares/errorHandler";

(async () => {
  try {
    await createConnection();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());

    app.use("/", require("@/routes").default);

    app.use(errorHandler);
    app.listen(80);

    console.log("Express server has started.");
  } catch (error) {
    console.log(error);
  }
})();
