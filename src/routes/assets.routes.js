import { Router } from "express";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getMyAssets,
} from "../controllers/assets.controller.js";
import { createAssetValidation } from "../middlewares/validations/asset.validations.js";
import { validator } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { responsibleMiddleware } from "../middlewares/responsible.middleware.js";

export const assetRoutes = Router();

// TODO: proteger las rutas con middlewares de autenticación y autorización faltantes

// Crear asset (usuario autenticado)
assetRoutes.post("/assets", authMiddleware, createAssetValidation, validator, createAsset);

// Listar todos los assets (solo admin)
assetRoutes.get("/assets", authMiddleware, adminMiddleware, getAllAssets);

// Listar mis assets (usuario responsable)
assetRoutes.get("/assets/my-assets", authMiddleware, getMyAssets);

// Eliminar asset por id (usuario responsable)
assetRoutes.delete("/assets/:id", authMiddleware, responsibleMiddleware, deleteAsset);
