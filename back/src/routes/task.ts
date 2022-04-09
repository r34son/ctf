import TaskController from "@/controllers/TaskController";
import { isAdmin, jwtAuth } from "@/middlewares/jwt";
import { Router } from "express";

const router = Router();

router.post("/", jwtAuth, isAdmin, TaskController.create);

export default router;
