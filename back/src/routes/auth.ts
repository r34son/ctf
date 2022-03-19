import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import { jwtAuth } from "@/middlewares/jwt";

const router = Router();

router.post("/login", AuthController.login);
router.post("/login-admin", AuthController.adminLogin);
router.get("/me", jwtAuth, AuthController.getTeamByToken);

export default router;
