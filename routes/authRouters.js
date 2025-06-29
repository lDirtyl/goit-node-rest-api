import express from "express";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import auth from "../middlewares/auth.js";

import { registerAuthSchema, loginAuthSchema } from "../schemas/authSchemas.js";

import {
  register,
  login,
  current,
  logout,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerAuthSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(loginAuthSchema), ctrlWrapper(login));

authRouter.post("/logout", auth, ctrlWrapper(logout));

authRouter.get("/current", auth, ctrlWrapper(current));

export default authRouter;
