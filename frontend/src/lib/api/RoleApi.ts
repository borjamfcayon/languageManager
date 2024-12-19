import { useQuery } from "react-query";

// Definir la URL base para los roles en la API
const BASE_URI = "http://localhost:3000/role";

// Hook para obtener los roles disponibles
export const useGetRole = () => {
  return useQuery("role", async () => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};

// Hook para obtener los usuarios por rol
export const useGetUsersByRole = (role: string) => {
  return useQuery("usersByRole", async () => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
    const response = await fetch(`${BASE_URI}/${role}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Devolver la respuesta de la API en formato JSON
  });
};
