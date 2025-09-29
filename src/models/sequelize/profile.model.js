import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define("Profile", {
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  phone: { type: DataTypes.STRING(20), allowNull: true },
});

// TODO: Relación uno a uno con User (1 User tiene 1 Profile)
// * 1:1 Profile ↔ User

UserModel.hasOne(ProfileModel, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});

// * 'profile' (User) y 'user' (Profile)

ProfileModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});

// ! FALTA COMPLETAR ACA
