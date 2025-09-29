export const createUserValidation = [
  // TODO: completar las validaciones para crear un usuario

  body("username")
    .isLength({ min: 3, max: 20 }).withMessage("username 3-20 caracteres")
    .isAlphanumeric().withMessage("username solo letras y números")
    .custom(async (value) => {
      const user = await UserModel.findOne({ username: value });
      if (user) throw new Error("username ya existe");
      return true;
    }),
  body("email")
    .isEmail().withMessage("email inválido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) throw new Error("email ya existe");
      return true;
    }),
  body("password")
    .isLength({ min: 8 })
    .matches(/[A-Z]/).withMessage("Password debe tener mayúscula")
    .matches(/[a-z]/).withMessage("Password debe tener minúscula")
    .matches(/[0-9]/).withMessage("Password debe tener número"),
  body("role").isIn(["secretary","administrator"]).withMessage("role inválido"),
  body("employee_number")
    .notEmpty().withMessage("employee_number obligatorio")
    .custom(async (value) => {
      const user = await UserModel.findOne({ "profile.employee_number": value });
      if (user) throw new Error("employee_number ya existe");
      return true;
    }),
  body("first_name").isLength({ min: 2, max: 50 }).matches(/^[A-Za-z]+$/).withMessage("first_name inválido"),
  body("last_name").isLength({ min: 2, max: 50 }).matches(/^[A-Za-z]+$/).withMessage("last_name inválido"),
  body("phone").optional().isMobilePhone().withMessage("phone inválido"),

];
