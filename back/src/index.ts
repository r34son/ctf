import { dataSource } from "@/dataSource";
import { errorHandler } from "@/middlewares/errorHandler";
import { socketIoJwtAuth } from "@/middlewares/jwt";
import cors, { CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { AddressInfo } from "net";
import "reflect-metadata";
import { Server } from "socket.io";
import { SocketServer } from "./interfaces/socket";

const corsOptions: CorsOptions = { origin: "*" };

(async () => {
  try {
    await dataSource.initialize();
    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use("/", require("@/routes").default);
    app.use(errorHandler);

    const httpServer = app.listen(process.env.PORT || 80, () =>
      console.log(
        `Express server has started on port ${
          (httpServer.address() as AddressInfo).port
        }`
      )
    );

    const io = <SocketServer>(
      new Server(httpServer, { cors: corsOptions }).use(socketIoJwtAuth)
    );
    io.on("connection", (socket) => {
      console.log(socket.id);
    });

    app.set("io", io);
  } catch (error) {
    console.log(error);
  }
})();
