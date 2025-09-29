import { AssetModel } from "../models/asset.model.js";
import { UserModel } from "../models/user.model.js";
import { CategoryModel } from "../models/category.model.js";

export const createAsset = async (req, res) => {
  try {
    // TODO: crear asset (usuario autenticado)

    const { inventoryNumber, description, brand, model, status, acquisitionDate, acquisitionValue, categories } = req.body;

    const user = await UserModel.findById(req.user.id);
    if (!user || user.deletedAt) return res.status(400).json({ msg: "Usuario responsable inválido" });

    const validCategories = await CategoryModel.find({ _id: { $in: categories } });
    if (validCategories.length !== categories.length) return res.status(400).json({ msg: "Alguna categoría no existe" });

    const asset = await AssetModel.create({
      inventoryNumber,
      description,
      brand,
      model,
      status,
      acquisitionDate,
      acquisitionValue,
      responsible: user._id,
      categories,
    });

    return res.status(201).json({ msg: "Asset creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllAssets = async (_req, res) => {
  try {
    // TODO: listar assets con el responsible y sus categories (populate) (solo admin)

    const assets = await AssetModel.find()
      .populate("responsible", "username email profile")
      .populate("categories", "name description");

    return res.status(200).json({ data: assets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyAssets = async (req, res) => {
  try {
    // TODO: assets con sus categories (populate) del usuario logueado (solo si el usuario logueado es responsible de assets)

    const myAssets = await AssetModel.find({ responsible: req.user.id })
      .populate("categories", "name description");

    return res.status(200).json({ data: myAssets });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    // TODO: eliminar un asset (solo si el usuario logueado es el responsible del asset)

    const asset = await AssetModel.findById(req.params.id);
    if (!asset) return res.status(404).json({ msg: "Asset no encontrado" });
    if (asset.responsible.toString() !== req.user.id) return res.status(403).json({ msg: "No autorizado" });

    await asset.remove(); 
    return res.status(204).json({ msg: "Asset eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
