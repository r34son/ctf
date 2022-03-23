import { jwtAuth, isAdmin } from "@/middlewares/jwt";
import { Router } from "express";
import TeamController from "@/controllers/TeamController";

const router = Router();

router.post("/", jwtAuth, isAdmin, TeamController.create);

export default router;
