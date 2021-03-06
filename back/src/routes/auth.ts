import AuthController from "@/controllers/AuthController";
import { Router } from "express";
import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
  message:
    "Превышен лимит для попыток авторизации. Пожалуйста, повторите позже.",
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();

router.post("/login", loginRateLimiter, AuthController.login);
router.post("/login-admin", loginRateLimiter, AuthController.adminLogin);

export default router;
