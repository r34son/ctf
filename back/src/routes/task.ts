import TaskController from "@/controllers/TaskController";
import { isAdmin, jwtAuth } from "@/middlewares/jwt";
import { Router } from "express";
import rateLimit from "express-rate-limit";

const solveRateLimiter = rateLimit({
  message:
    "Превышен лимит для попыток отправки флага. Пожалуйста, повторите позже.",
  max: 20, // Limit each IP to 5 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();

router.get("/", jwtAuth, TaskController.all);
router.get("/rating", TaskController.stats);
router.post("/solve", solveRateLimiter, jwtAuth, TaskController.solve);
router.post("/", jwtAuth, isAdmin, TaskController.create);
router.put("/:id", jwtAuth, isAdmin, TaskController.update);
router.delete("/:id", jwtAuth, isAdmin, TaskController.remove);

export default router;
