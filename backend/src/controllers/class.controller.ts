import { Request, Response } from "express";
import Class from "../models/class"; // Modelo de clase.
import { getUserRole } from "./user.controller"; // Función para obtener el rol del usuario.
import mongoose from "mongoose"; // Biblioteca para manejar MongoDB y objetos ObjectId.
import { ISchedule } from "../models/schedule"; // Interfaz de horarios de clase.

// Controlador para obtener todas las clases.
export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const classes = await Class.find(); // Obtiene todas las clases de la base de datos.
  return res.json(classes);
};

// Controlador para obtener una clase por su ID.
export const getClassById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const class_ = await Class.findById(req.params.id); // Busca la clase por su ID.
  return res.json(class_);
};

// Controlador para crear una nueva clase.
export const createClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verifica que el usuario tenga permisos para crear una clase.
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Extrae datos del cuerpo de la solicitud.
  const { language, teacher, students, schedules, imgUrl } = req.body;

  try {
    // Crea una nueva instancia del modelo de clase con los datos proporcionados.
    const newClass = new Class({
      language,
      teacher: new mongoose.Types.ObjectId(teacher), // Convierte el ID del profesor a ObjectId.
      students: students.map((id: string) => new mongoose.Types.ObjectId(id)), // Convierte los IDs de los estudiantes.
      schedules: schedules.map((id: string) => new mongoose.Types.ObjectId(id)), // Convierte los IDs de los horarios.
      imgUrl,
    });
    await newClass.save(); // Guarda la nueva clase en la base de datos.
    return res.json(newClass);
  } catch (error) {
    console.error("Error creating class:", error); // Registra errores en el servidor.
    return res.status(500).json({ error: "Error creating class" });
  }
};

// Controlador para actualizar una clase existente.
export const updateClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params; // ID de la clase a actualizar.
  const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
    new: true, // Devuelve el documento actualizado.
  });
  return res.json(updatedClass);
};

// Controlador para eliminar una clase.
export const deleteClass = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // Verifica que el usuario tenga permisos para eliminar una clase.
  const role = getUserRole(req);
  if (role !== "admin" && role !== "teacher") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await Class.findByIdAndDelete(req.params.id); // Elimina la clase por su ID.
  return res.json({
    msg: "Class Deleted Successfully",
  });
};

// Controlador para obtener múltiples clases por sus IDs.
export const getClassesByIds = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ids } = req.body; // Array de IDs enviado en el cuerpo de la solicitud.
  const classes = await Class.find({ _id: { $in: ids } }); // Busca las clases cuyos IDs coincidan.
  return res.json(classes);
};

// Interfaz para las próximas clases.
interface NextClass {
  name: string; // Nombre del idioma de la clase.
  imgUrl: string; // URL de la imagen asociada a la clase.
  day: string; // Día del próximo horario.
  hour: number; // Hora del próximo horario.
}

// Controlador para obtener las próximas clases basadas en los horarios.
export const getNextClasses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { ids } = req.body; // Array de IDs enviado en el cuerpo de la solicitud.

  // Valida que se hayan proporcionado IDs y que sean un array.
  if (!ids || !Array.isArray(ids)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'ids' array in the request body" });
  }

  // Convierte los IDs a ObjectIds.
  const objectIds = ids.map((id: string) => new mongoose.Types.ObjectId(id));

  // Busca las clases con los IDs proporcionados y las poblamos con los horarios.
  const classes = await Class.find({ _id: { $in: objectIds } }).populate<{
    schedules: ISchedule[];
  }>("schedules");

  if (classes.length === 0) {
    return res
      .status(404)
      .json({ message: "No classes found with the provided IDs" });
  }

  // Procesa los horarios para determinar el próximo horario disponible.
  const nextClasses: NextClass[] = classes.map((class_) => {
    const nextSchedule = class_.schedules.reduce(
      (next: ISchedule, schedule: ISchedule): ISchedule => {
        const now = new Date();
        const currentDay = now.toLocaleString("en-US", { weekday: "long" });
        const currentHour = now.getHours();

        // Encuentra el próximo horario disponible.
        if (schedule.day === currentDay) {
          const nextHour = schedule.hours.find((hour) => hour > currentHour);
          if (nextHour !== undefined) {
            if (!next || nextHour < next.hours[0]) {
              return { ...schedule.toObject(), hours: [nextHour] };
            }
          }
        } else if (!next) {
          return schedule;
        }
        return next;
      },
      class_.schedules[0]
    );

    // Devuelve la información procesada de la próxima clase.
    return {
      name: class_.language,
      imgUrl: class_.imgUrl,
      day: nextSchedule?.day || "",
      hour: nextSchedule?.hours[0] || 0,
    };
  });

  return res.json(nextClasses);
};
