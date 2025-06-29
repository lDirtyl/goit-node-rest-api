import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_TOKEN_EXPIRES_IN } = process.env;

export const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_TOKEN_EXPIRES_IN });

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return { data };
  } catch (error) {
    return { error };
  }
};
