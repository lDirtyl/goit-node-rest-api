import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const { JWT_SECRET } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const createVerificationToken = () => nanoid();
