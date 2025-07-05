import Joi from "joi";
import { PASSWORD_MIN, SUBSCRIPTIONS } from "../constants/auth.js";

export const registerAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(PASSWORD_MIN).required(),
  subscription: Joi.string().valid(...SUBSCRIPTIONS),
});

export const loginAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(PASSWORD_MIN).required(),
});

export const verifyAuthSchema = Joi.object({
  email: Joi.string().email().required(),
});
