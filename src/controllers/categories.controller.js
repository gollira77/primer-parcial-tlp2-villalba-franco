import { CategoryModel } from "../models/category.model.js";
import { AssetModel } from "../models/asset.model.js";

export const createCategory = async (req, res) => {
  try {
    // TODO: crear category (solo admin)

    const { name, description } = req.body;
    const existing = await CategoryModel.findOne({ name });
    if (existing) return res.status(400).json({ msg: "Nombre de categoría ya existe" });

    const category = await CategoryModel.create({ name, description });

    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)

    const categories = await CategoryModel.find().populate("assets", "inventoryNumber description");

    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian

    const category = await CategoryModel.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: "Categoría no encontrada" });

    await AssetModel.updateMany(
      { categories: category._id },
      { $pull: { categories: category._id } }
    );

    await category.remove();

    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
