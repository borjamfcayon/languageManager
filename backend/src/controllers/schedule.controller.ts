import { Request, Response } from "express";
import Schedule from "../models/schedule";
import { getUserRole } from "./user.controller";

export const getAllSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedules = await Schedule.find();
  return res.json(schedules);
};

export const getScheduleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const schedule = await Schedule.findById(id);
  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.json(schedule);
};

export const createSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { day, hours } = req.body;
  const newSchedule = new Schedule({ day, hours });
  await newSchedule.save();
  return res.status(201).json(newSchedule);
};

export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const { day, hours } = req.body;
  const updatedSchedule = await Schedule.findByIdAndUpdate(
    id,
    { day, hours },
    { new: true }
  );
  if (!updatedSchedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.json(updatedSchedule);
};

export const deleteSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params;
  const deletedSchedule = await Schedule.findByIdAndDelete(id);
  if (!deletedSchedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.status(204).json();
};

export const getScheduleByIds = async (req: Request, res: Response): Promise<Response> => {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.json([]);
  }

  const schedules = await Schedule.find({ _id: { $in: ids } });
  return res.json(schedules);
};
