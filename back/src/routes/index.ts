import { default as authRouter } from "@/routes/auth";
import { default as taskRouter } from "@/routes/task";
import { default as teamRouter } from "@/routes/team";
import { default as timerRouter } from "@/routes/timer";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/team", teamRouter);
router.use("/timer", timerRouter);

export default router;
