import { Router } from "express";
import { default as authRouter } from "@/routes/auth";
import { default as teamRouter } from "@/routes/team";

const router = Router();

router.use("/auth", authRouter);
router.use("/team", teamRouter);

export default router;
