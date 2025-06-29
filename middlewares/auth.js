import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/authService.js";
import { verifyToken } from "../helpers/auth.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  const { data, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, "Not authorized"));
  }

  const user = await findUserById(data.id);
  if (!user || user.token !== token) {
    return next(HttpError(401, "Not authorized"));
  }

  req.user = user;

  next();
};

export default auth;
