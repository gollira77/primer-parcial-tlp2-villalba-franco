export const createCategoryValidation = [
  // TODO: completar las validaciones para crear una categoria

  body("name")
    .isLength({ min: 3, max: 100 }).withMessage("name 3-100 caracteres")
    .custom(async (value) => {
      const cat = await CategoryModel.findOne({ name: value });
      if (cat) throw new Error("name ya existe");
      return true;
    }),
  body("description").optional().isLength({ max: 500 }).withMessage("description máximo 500 caracteres"),

];
