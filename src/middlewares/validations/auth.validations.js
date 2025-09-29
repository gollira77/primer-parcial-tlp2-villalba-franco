import { body } from "express-validator";
import { UserModel } from "../models/mongoose/user.model.js";

export const registerValidation = [
  // TODO: completar las validaciones para el registro

   body("username")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("Username solo puede contener letras y números")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) throw new Error("Username ya existe");
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("Email inválido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) throw new Error("Email ya existe");
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password mínimo 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("Password debe tener al menos una mayúscula")
    .matches(/[a-z]/)
    .withMessage("Password debe tener al menos una minúscula")
    .matches(/[0-9]/)
    .withMessage("Password debe tener al menos un número"),
  body("role")
    .isIn(["secretary", "administrator"])
    .withMessage("Role inválido"),
  body("employee_number")
    .notEmpty()
    .withMessage("employee_number obligatorio")
    .custom(async (value) => {
      const user = await UserModel.findOne({ "profile.employee_number": value });
      if (user) throw new Error("employee_number ya existe");
      return true;
    }),
  body("first_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-z]+$/)
    .withMessage("first_name solo letras"),
  body("last_name")
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-z]+$/)
    .withMessage("last_name solo letras"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Formato de teléfono inválido"),

];

export const loginValidation = [
  // TODO: completar las validaciones para el login

  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 8 }).withMessage("Password mínimo 8 caracteres"),

];
