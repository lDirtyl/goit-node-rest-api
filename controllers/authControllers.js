import path from "node:path";
import fs from "node:fs/promises";
import * as authServices from "../services/authService.js";
import HttpError from "../helpers/HttpError.js";
import { sendVerificationEmail } from "../services/emailService.js";

export const register = async (req, res) => {
  const { email, subscription, avatarURL } = await authServices.addUser(
    req.body
  );

  res.status(201).json({
    user: {
      email,
      subscription,
      avatarURL,
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
  const { email, subscription, avatarURL } = req.user;

  res.status(200).json({
    email,
    subscription,
    avatarURL,
  });
};

const avatarsDir = path.resolve("public", "avatars");

export const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const { id } = req.user;
  const newAvatar = `${id}_${originalname}`;
  const newPath = path.join(avatarsDir, newAvatar);
  const newAvatarURL = `/avatars/${newAvatar}`;

  try {
    await fs.mkdir(avatarsDir, { recursive: true });
    await fs.rename(tempPath, newPath); // переміщення

    await authServices.updateUser(id, { avatarURL: newAvatarURL });

    res.status(200).json({ avatarURL: newAvatarURL });
  } catch (error) {
    // Безпечне видалення: пробуємо, але не падаємо, якщо файл вже зник
    try {
      await fs.unlink(tempPath);
    } catch (unlinkErr) {
      console.error("Avatar update error:", error); // Додай це!
      await fs.unlink(tempPath).catch(() => {}); // Щоб не впав, якщо файл вже переміщений
      throw HttpError(500, error.message); // Або тимчасово так для дебагу
    }

    throw HttpError(500, "Error saving avatar");
  }
};

export const verify = async (req, res) => {
  const { verificationToken } = req.params;
  await authServices.verifyUser(verificationToken);

  res.json({
    message: "Verification successful",
  });
};

export const sendVerify = async (req, res) => {
  const { email } = req.body;
  await authServices.sendVerify(email);
  res.json({
    message: "Verification email sent",
  });
};
