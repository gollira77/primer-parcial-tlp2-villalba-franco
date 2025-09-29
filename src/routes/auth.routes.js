import { Router } from "express";
import {
  login,
  logout,
  getProfile,
  register,
} from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validations.js";
import { validator } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes (si fuera necesario)

// Registrar usuario (público)
authRoutes.post("/auth/register", registerValidation, validator, register);

// Login (público)
authRoutes.post("/auth/login", loginValidation, validator, login);

// Obtener perfil (usuario autenticado)
authRoutes.get("/auth/profile", authMiddleware, getProfile);

// Logout (usuario autenticado)
authRoutes.post("/auth/logout", authMiddleware, logout);
