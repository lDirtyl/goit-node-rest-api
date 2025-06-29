import bcrypt from "bcrypt";

import User from "../db/User.js";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/auth.js";

const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

export const findUserById = async (userId) => {
  return await User.findByPk(userId);
};

export const addUser = async (payload) => {
  const { email } = payload;
  const user = await findUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const password = await bcrypt.hash(payload.password, 10);
  return await User.create({ ...payload, password });
};

export const login = async (payload) => {
  const { email, password } = payload;
  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = createToken({ id: user.id, email });
  const updatedUser = await user.update({ token }, { returning: true });

  return {
    token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  };
};

export const logout = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  await user.update({ token: null });
};
