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
  const data = req.body;
  await User.findByIdAndUpdate(req.params.id, data);
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
    const users = await User.find({ role: req.params.role });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllUsersOfAClass = async (
  req: Request, res: Response
) => {
  const classId = req.params.classId;
  try {
    const users = await User.find({ classes: classId });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMyUserInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const decoded: any = jwt.verify(token, config.jwtSecret);
  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) {
    return res.status(404).json({ msg: "No user found" });
  }
  return res.status(200).json(user);
};

export const getAllUsersByIds = async (
  req: Request, res: Response
) => {
  const userIds = req.body.userIds;
  try {
    const users = await User.find({ _id: { $in: userIds } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}