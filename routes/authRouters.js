import express from "express";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

import {
  registerAuthSchema,
  loginAuthSchema,
  verifyAuthSchema,
} from "../schemas/authShemas.js";

import {
  register,
  login,
  current,
  logout,
  updateAvatar,
  sendVerify,
  verify,
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

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

authRouter.get("/verify/:verificationToken", ctrlWrapper(verify));

authRouter.post(
  "/verify",
  validateBody(verifyAuthSchema),
  ctrlWrapper(sendVerify)
);

export default authRouter;
