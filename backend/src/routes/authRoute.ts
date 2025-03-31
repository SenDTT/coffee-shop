import { Router } from "express";
import {
  login_validator,
  signup_validator,
} from "../middlewares/AuthMiddleware";
import {
  loginController,
  refreshTokenController,
  signupController,
} from "../controllers/AuthController";

const router = Router();

router.post("/signup", signup_validator, signupController);
router.post("/login", login_validator, loginController);
router.post("/refresh-token", refreshTokenController);

export default router;
