import mongoose from "mongoose";
import User from "../models/user";
import { Request, Response } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await User.find();
  return res.json(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "User Deleted Successfully",
  });
};
