import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import { jwtAuth } from "@/middlewares/jwt";
import rateLimit from "express-rate-limit";

const loginRateLimiter = rateLimit({
  message:
    "Too many login attempts from this IP, please try again after an minute",
  max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const router = Router();

router.post("/login", loginRateLimiter, AuthController.login);
router.post("/login-admin", loginRateLimiter, AuthController.adminLogin);
router.get("/me", jwtAuth, AuthController.getTeamByToken);

export default router;
