import { Request, Response } from "express";
import Schedule from "../models/schedule"; // Modelo para los horarios.
import { getUserRole } from "./user.controller"; // Función para obtener el rol del usuario.

// Controlador para obtener todos los horarios.
export const getAllSchedules = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedules = await Schedule.find(); // Obtiene todos los documentos de la colección de horarios.
  return res.json(schedules);
};

// Controlador para obtener un horario específico por ID.
export const getScheduleById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud.
  const schedule = await Schedule.findById(id); // Busca el horario por ID en la base de datos.
  if (!schedule) {
    // Si no se encuentra, devuelve un error 404.
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.json(schedule); // Retorna el horario encontrado.
};

// Controlador para crear un nuevo horario.
export const createSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verifica que el usuario tenga permisos para crear un horario.
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Extrae los datos del cuerpo de la solicitud.
  const { day, hours } = req.body;

  // Crea una nueva instancia del modelo de horario.
  const newSchedule = new Schedule({ day, hours });
  await newSchedule.save(); // Guarda el horario en la base de datos.
  return res.status(201).json(newSchedule); // Devuelve el horario creado.
};

// Controlador para actualizar un horario existente.
export const updateSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verifica que el usuario tenga permisos para actualizar un horario.
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud.
  const { day, hours } = req.body; // Extrae los datos a actualizar del cuerpo de la solicitud.
  const updatedSchedule = await Schedule.findByIdAndUpdate(
    id, // ID del horario a actualizar.
    { day, hours }, // Datos a actualizar.
    { new: true } // Opciones para devolver el documento actualizado.
  );
  if (!updatedSchedule) {
    // Si no se encuentra el horario, devuelve un error 404.
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.json(updatedSchedule); // Retorna el horario actualizado.
};

// Controlador para eliminar un horario.
export const deleteSchedule = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verifica que el usuario tenga permisos para eliminar un horario.
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.params; // Extrae el ID del horario a eliminar.
  const deletedSchedule = await Schedule.findByIdAndDelete(id); // Elimina el horario por su ID.
  if (!deletedSchedule) {
    // Si no se encuentra, devuelve un error 404.
    return res.status(404).json({ message: "Schedule not found" });
  }
  return res.status(204).json(); // Respuesta sin contenido.
};

// Controlador para obtener múltiples horarios por sus IDs.
export const getScheduleByIds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ids } = req.body; // Extrae el array de IDs del cuerpo de la solicitud.

  // Si no hay IDs proporcionados o el array está vacío, devuelve un array vacío.
  if (!ids || ids.length === 0) {
    return res.json([]);
  }

  // Busca los horarios cuyos IDs coincidan con los proporcionados.
  const schedules = await Schedule.find({ _id: { $in: ids } });
  return res.json(schedules); // Retorna los horarios encontrados.
};
