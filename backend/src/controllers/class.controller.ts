import { Request, Response } from "express";
import Class from "../models/class";
import { getUserRole } from "./user.controller";
import mongoose from "mongoose";
import { ISchedule } from "../models/schedule";

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

export const createClass = async (req: Request, res: Response): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { language, teacher, students, schedules, imgUrl } = req.body;

  try {
    const newClass = new Class({
      language,
      teacher: new mongoose.Types.ObjectId(teacher),
      students: students.map((id: string) => new mongoose.Types.ObjectId(id)),
      schedules: schedules.map((id: string) => new mongoose.Types.ObjectId(id)),
      imgUrl,
    });
    await newClass.save();
    return res.json(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json({ error: "Error creating class" });
  }
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
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await Class.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "Class Deleted Successfully",
  });
};

export const getClassesByIds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ids } = req.body;
  const classes = await Class.find({ _id: { $in: ids } });
  return res.json(classes);
}

interface NextClass {
  name: string;
  imgUrl: string;
  day: string;
  hour: number;
}

export const getNextClasses = async (req: Request, res: Response): Promise<Response> => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid or missing 'ids' array in the request body" });
  }

  const objectIds = ids.map((id: string) => new mongoose.Types.ObjectId(id));

  const classes = await Class.find({ _id: { $in: objectIds } }).populate<{ schedules: ISchedule[] }>('schedules');

  if (classes.length === 0) {
    return res.status(404).json({ message: "No classes found with the provided IDs" });
  }

  const nextClasses: NextClass[] = classes.map(class_ => {
    const nextSchedule = class_.schedules.reduce((next: ISchedule, schedule: ISchedule): ISchedule => {
      const now = new Date();
      const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
      const currentHour = now.getHours();

      if (schedule.day === currentDay) {
        const nextHour = schedule.hours.find(hour => hour > currentHour);
        if (nextHour !== undefined) {
          if (!next || nextHour < next.hours[0]) {
            return { ...schedule.toObject(), hours: [nextHour] };
          }
        }
      } else if (!next) {
        return schedule;
      }
      return next;
    }, class_.schedules[0]);

    return {
      name: class_.language,
      imgUrl: class_.imgUrl,
      day: nextSchedule?.day || '',
      hour: nextSchedule?.hours[0] || 0,
    };
  });

  return res.json(nextClasses);
};

