import { Request, Response } from "express";
import Class from "../models/class";

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
  const { language, teacher, students, schedule } = req.body;
  const newClass = new Class({ language, teacher, students, schedule });
  await newClass.save();
  return res.json(newClass);
};

export const updateClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
  await Class.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "Class Deleted Successfully",
  });
};
