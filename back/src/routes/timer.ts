import { jwtAuth, isAdmin } from "@/middlewares/jwt";
import { Router } from "express";
import TimerController from "@/controllers/TimerController";

const router = Router();

router.get("/events", TimerController.timerEvents);
router.post("/start", jwtAuth, isAdmin, TimerController.start);
router.post("/stop", jwtAuth, isAdmin, TimerController.stop);
router.post("/pause", jwtAuth, isAdmin, TimerController.pause);
router.post("/resume", jwtAuth, isAdmin, TimerController.resume);

export default router;
