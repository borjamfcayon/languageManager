import mongoose from "mongoose";
import User from "../models/user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const getUserRole = (req: Request): string | null => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { role: string };
    return decoded.role || null;
  } catch {
    return null;
  }
};


export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: error });
  }
};


export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user = await User.findById(req.params.id);
  return res.json(user);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name,
    surname,
    mainLanguage,
    class: userClass,
    role,
  } = req.body as {
    name: string;
    surname: string;
    email: string;
    password: string;
    mainLanguage: string;
    class: mongoose.Types.ObjectId[];
    role: string;
  };
  const userRole = getUserRole(req);
  if (userRole !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  await User.findByIdAndUpdate(req.params.id, {
    name,
    surname,
    mainLanguage,
    class: userClass,
    role,
  });
  return res.json({
    msg: "User Updated Successfully",
  });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await User.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "User Deleted Successfully",
  });
};

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

export const getUserByRole = async (req: Request, res: Response) => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const user = await User.findOne({ role: req.params.role });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
