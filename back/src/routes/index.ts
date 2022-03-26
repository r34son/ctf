import { Router } from "express";
import { default as authRouter } from "@/routes/auth";
import { default as teamRouter } from "@/routes/team";
import { default as timerRouter } from "@/routes/timer";

const router = Router();

router.use("/auth", authRouter);
router.use("/team", teamRouter);
router.use("/timer", timerRouter);

export default router;
