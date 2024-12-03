import { Request, Response } from "express";
import Schedule from "../models/schedule";

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
  const { day, hours } = req.body;
  const newSchedule = new Schedule({ day, hours });
  await newSchedule.save();
  return res.status(201).json(newSchedule);
};

export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
  const { id } = req.params;
  const deletedSchedule = await Schedule.findByIdAndDelete(id);
  if (!deletedSchedule) {
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.status(204).json();
};
