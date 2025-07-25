import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

const User = sequelize.define(
  "user",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter",
    },
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    verify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// User.sync({ alter: true });
// User.sync();

export default User;
