import * as authServices from "../services/authService.js";

export const register = async (req, res) => {
  const { email, subscription } = await authServices.addUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

export const login = async (req, res) => {
  const { token, user } = await authServices.login(req.body);

  res.json({ token, user });
};

export const logout = async (req, res) => {
  await authServices.logout(req.user.id);

  res.status(204).send();
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};
