import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory

AssetModel.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  as: "categories",
  foreignKey: "assetId",
});

// * 'categories' (Asset) y 'assets' (Category)

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  as: "assets",
  foreignKey: "categoryId",
});

// ! FALTA COMPLETAR ACA
