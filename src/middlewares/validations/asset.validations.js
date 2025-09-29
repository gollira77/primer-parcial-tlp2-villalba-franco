import { body } from "express-validator";
import { UserModel } from "../models/mongoose/user.model.js";
import { CategoryModel } from "../models/mongoose/category.model.js";

export const createAssetValidation = [
  // TODO: completar las validaciones para crear un recurso

  body("inventoryNumber")
    .notEmpty().withMessage("inventoryNumber obligatorio")
    .custom(async (value) => {
      const asset = await (await import("../models/mongoose/asset.model.js")).AssetModel.findOne({ inventoryNumber: value });
      if (asset) throw new Error("inventoryNumber ya existe");
      return true;
    }),
  body("description").isLength({ min: 10, max: 500 }).withMessage("description 10-500 caracteres"),
  body("brand").isLength({ min: 2, max: 100 }).withMessage("brand 2-100 caracteres"),
  body("model").isLength({ min: 2, max: 100 }).withMessage("model 2-100 caracteres"),
  body("status").isIn(["good", "regular", "bad", "out_of_service"]).withMessage("status inválido"),
  body("acquisitionDate").isISO8601().withMessage("Fecha inválida").custom((value) => {
    if (new Date(value) > new Date()) throw new Error("Fecha no puede ser futura");
    return true;
  }),
  body("acquisitionValue").isFloat({ gt: 0 }).withMessage("acquisitionValue debe ser positivo"),
  body("responsible").custom(async (value) => {
    const user = await UserModel.findById(value);
    if (!user || user.deletedAt) throw new Error("responsible_id inválido");
    return true;
  }),
  body("categories").isArray().withMessage("categories debe ser un array")
    .custom(async (ids) => {
      const valid = await CategoryModel.find({ _id: { $in: ids } });
      if (valid.length !== ids.length) throw new Error("Algunas categorías no existen");
      return true;
    }),

];
