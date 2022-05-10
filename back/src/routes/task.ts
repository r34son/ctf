import TaskController from "@/controllers/TaskController";
import { isAdmin, jwtAuth } from "@/middlewares/jwt";
import { Router } from "express";

const router = Router();

router.get("/", jwtAuth, TaskController.all);
router.get("/stats", TaskController.stats);
router.post("/solve", jwtAuth, TaskController.solve);
router.post("/", jwtAuth, isAdmin, TaskController.create);
router.put("/:id", jwtAuth, isAdmin, TaskController.update);
router.delete("/:id", jwtAuth, isAdmin, TaskController.remove);

export default router;
