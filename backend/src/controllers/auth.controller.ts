import { Request, Response } from "express";
import User, { IUser } from "../models/user"; // Modelo de usuario y la interfaz IUser.
import jwt from "jsonwebtoken"; // Biblioteca para manejar JSON Web Tokens.
import config from "../config/config"; // Archivo de configuración para obtener la clave secreta.

// Función para generar un token JWT basado en los datos del usuario.
function createToken(user: IUser): string {
  return jwt.sign(
    {
      id: user.id, // ID del usuario.
      email: user.email, // Correo electrónico del usuario.
      role: user.role, // Rol del usuario (si aplica).
    },
    config.jwtSecret, // Clave secreta para firmar el token.
    {
      expiresIn: 43200, // Tiempo de expiración del token en segundos (12 horas).
    }
  );
}

// Controlador para el registro de usuarios.
export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verificamos que el email y la contraseña sean proporcionados.
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  // Comprobamos si el usuario ya existe en la base de datos.
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "The User already Exists" });
  }

  // Creamos un nuevo usuario y lo guardamos en la base de datos.
  const newUser = new User(req.body);
  await newUser.save();

  // Retornamos el nuevo usuario como respuesta.
  return res.status(201).json(newUser);
};

// Controlador para iniciar sesión.
export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verificamos que el email y la contraseña sean proporcionados.
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  // Buscamos el usuario por email en la base de datos.
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exist" });
  }

  // Comparamos la contraseña proporcionada con la almacenada en la base de datos.
  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    // Si las contraseñas coinciden, devolvemos un token JWT.
    return res.status(200).json({ token: createToken(user) });
  }

  // Si las contraseñas no coinciden, enviamos un mensaje de error.
  return res.status(400).json({
    msg: "The email or password are incorrect",
  });
};

// Controlador para verificar un token JWT.
export const verifyToken = (req: Request, res: Response): Response => {
  // Obtenemos el encabezado de autorización.
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ authorized: false, message: "No token provided" });
  }

  // Extraemos el token del encabezado "Authorization".
  const token = authHeader.split(" ")[1];
  try {
    // Verificamos y decodificamos el token usando la clave secreta.
    const decoded = jwt.verify(token, config.jwtSecret);
    return res.status(200).json({ authorized: true, user: decoded });
  } catch (error) {
    // Si el token es inválido o ha expirado, enviamos un error.
    return res
      .status(403)
      .json({ authorized: false, message: "Invalid or expired token" });
  }
};
