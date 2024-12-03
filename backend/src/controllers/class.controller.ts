import { Request, Response } from "express";
import Class from "../models/class";
import { getUserRole } from "./user.controller";

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const classes = await Class.find();
  return res.json(classes);
};

export const getClassById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const class_ = await Class.findById(req.params.id);
  return res.json(class_);
};

export const createClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { language, teacher, students, schedule } = req.body;
  const newClass = new Class({ language, teacher, students, schedule });
  await newClass.save();
  return res.json(newClass);
};

export const updateClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return res.json(updatedClass);
};

export const deleteClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await Class.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "Class Deleted Successfully",
  });
};
