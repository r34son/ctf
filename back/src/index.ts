import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { Request, Response } from "express";
import { Routes } from "@/routes";
import { User } from "@/entity/User";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(helmet());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    app.use(limiter);

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(80);

    // insert new users for test
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27,
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24,
      })
    );

    console.log("Express server has started.");
  })
  .catch((error) => console.log(error));
