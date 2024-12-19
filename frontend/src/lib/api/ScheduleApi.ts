import { useQuery, useMutation } from "react-query";

// Definir la URL base para los horarios en la API
const BASE_URI = "http://localhost:3000/schedules";

// Interfaz para definir la estructura de los horarios a crear
export interface ISchedule {
  day: string; // Día de la semana
  hours: number[]; // Horas disponibles en el día
}

// Respuesta de la API para los horarios
export interface IScheduleResponse {
  _id: string; // ID único del horario
  day: string; // Día de la semana
  hours: number[]; // Horas disponibles en el día
}

// Hook para obtener todos los horarios
export const useGetSchedule = () => {
  return useQuery("schedule", async () => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para obtener un horario específico por ID
export const useGetScheduleById = (id: string) => {
  return useQuery("schedule", async () => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para crear un nuevo horario
export const useCreateSchedule = () => {
  return useMutation(async (data: ISchedule) => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}`, {
      method: "POST", // Enviar solicitud POST para crear el horario
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
        "Content-Type": "application/json", // Definir el tipo de contenido como JSON
      },
      body: JSON.stringify(data), // Convertir los datos del nuevo horario a formato JSON
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para actualizar un horario existente
export const useUpdateSchedule = () => {
  return useMutation(async (data: IScheduleResponse) => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}/${data._id}`, {
      method: "PUT", // Enviar solicitud PUT para actualizar el horario
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
        "Content-Type": "application/json", // Definir el tipo de contenido como JSON
      },
      body: JSON.stringify(data), // Convertir los datos del horario actualizado a formato JSON
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para eliminar un horario
export const useDeleteSchedule = () => {
  return useMutation(async (id: string) => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}/${id}`, {
      method: "DELETE", // Enviar solicitud DELETE para eliminar el horario
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para obtener horarios por múltiples IDs
export const useGetSchedulesByIds = (ids: string[]) => {
  return useQuery("schedules", async () => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}/ids`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados para autenticar la solicitud
        "Content-Type": "application/json", // Definir el tipo de contenido como JSON
      },
      method: "POST", // Enviar solicitud POST para obtener horarios por IDs
      body: JSON.stringify({ ids }), // Enviar los IDs en el cuerpo de la solicitud
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};
