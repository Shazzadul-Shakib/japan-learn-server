import { Router } from "express";
import { authController } from "./auth.controller";

export const authRouter=Router();

authRouter.post("/",authController.registerUser);
authRouter.post("/login",authController.loginUser);
authRouter.post("/logout",authController.logoutUser);