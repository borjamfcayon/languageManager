import mongoose from "mongoose";
import User from "../models/user"; // Modelo de usuario.
import { Request, Response } from "express";
import jwt from "jsonwebtoken"; // Biblioteca para manejar JSON Web Tokens.
import config from "../config/config"; // Archivo de configuración para la clave secreta.

// Función para obtener el rol del usuario a partir del token JWT.
export const getUserRole = (req: Request): string | null => {
  const authHeader = req.header("Authorization"); // Obtenemos el encabezado Authorization.
  if (!authHeader) {
    return null; // Si no existe, devolvemos null.
  }

  const token = authHeader.split(" ")[1]; // Extraemos el token del encabezado.
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { role: string }; // Decodificamos el token.
    return decoded.role || null; // Retornamos el rol, o null si no está definido.
  } catch {
    return null; // Si hay un error al verificar, devolvemos null.
  }
};

// Controlador para obtener todos los usuarios.
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req); // Obtenemos el rol del usuario autenticado.
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" }); // Solo los administradores pueden acceder.
  }

  try {
    const users = await User.find(); // Obtenemos todos los usuarios de la base de datos.
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error }); // Manejamos errores de servidor.
  }
};

// Controlador para obtener un usuario por su ID.
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" }); // Solo los administradores pueden acceder.
  }
  const user = await User.findById(req.params.id); // Buscamos el usuario por su ID.
  return res.json(user);
};

// Controlador para actualizar un usuario.
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = req.body; // Obtenemos los datos a actualizar desde el cuerpo de la solicitud.
  await User.findByIdAndUpdate(req.params.id, data); // Actualizamos el usuario.
  return res.json({
    msg: "User Updated Successfully", // Confirmación de éxito.
  });
};

// Controlador para eliminar un usuario.
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" }); // Solo los administradores pueden eliminar usuarios.
  }

  await User.findByIdAndDelete(req.params.id); // Eliminamos el usuario por su ID.
  return res.json({
    msg: "User Deleted Successfully", // Confirmación de éxito.
  });
};

// Controlador para obtener el rol de un usuario desde su token JWT.
export const getRole = (req: Request, res: Response): Response | void => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { role: string };
    const userRole = decoded.role;

    if (!userRole) {
      return res.status(400).json({ error: "Role is not defined in token" });
    }

    return res.json({ role: userRole });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Controlador para obtener usuarios por su rol.
export const getUserByRole = async (req: Request, res: Response) => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" }); // Solo administradores y profesores pueden acceder.
  }
  try {
    const users = await User.find({ role: req.params.role }); // Buscamos usuarios con el rol especificado.
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" }); // Si no hay usuarios, devolvemos un 404.
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controlador para obtener todos los usuarios asociados a una clase.
export const getAllUsersOfAClass = async (req: Request, res: Response) => {
  const classId = req.params.classId; // ID de la clase.
  try {
    const users = await User.find({ classes: classId }); // Buscamos usuarios asociados a la clase.
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controlador para obtener información del usuario autenticado.
export const getMyUserInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraemos el token del encabezado.
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded: any = jwt.verify(token, config.jwtSecret); // Decodificamos el token.
    const user = await User.findById(decoded.id, { password: 0 }); // Buscamos al usuario, excluyendo la contraseña.
    if (!user) {
      return res.status(404).json({ msg: "No user found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

// Controlador para obtener múltiples usuarios por sus IDs.
export const getAllUsersByIds = async (req: Request, res: Response) => {
  const userIds = req.body.userIds; // Array de IDs recibido en el cuerpo de la solicitud.
  try {
    const users = await User.find({ _id: { $in: userIds } }); // Buscamos los usuarios cuyos IDs coincidan.
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
