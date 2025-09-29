import { UserModel } from "../models/user.model.js";
import { AssetModel } from "../models/asset.model.js";

export const getAllUsers = async (_req, res) => {
  try {
    // TODO: devolver usuarios con profile y sus assets con sus categories (populate) (solo admin)

    const users = await UserModel.find()
      .populate("profile")
      .populate({
        path: "assets",
        populate: { path: "categories", select: "name description" },
      });

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // TODO: eliminación lógica (deletedAt) (solo admin)

     const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    user.deletedAt = new Date();
    await user.save();

    return res.status(204).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
