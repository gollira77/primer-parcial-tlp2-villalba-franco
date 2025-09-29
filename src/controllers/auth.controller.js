import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    // TODO: crear usuario con password hasheada y profile embebido

    const { username, email, password, role, employee_number, first_name, last_name, phone } = req.body;

     const existingUser = await UserModel.findOne({ 
      $or: [{ username }, { email }, { "profile.employee_number": employee_number }] 
    });
    if (existingUser) return res.status(400).json({ msg: "Username, email o employee_number ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
      profile: { employee_number, first_name, last_name, phone },
    });

    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || user.deletedAt) return res.status(404).json({ msg: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente

    const user = await UserModel.findById(req.user.id).select("-password -__v -deletedAt");
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });


    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
