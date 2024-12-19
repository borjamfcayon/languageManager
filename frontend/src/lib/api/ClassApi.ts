import { useQuery, useMutation, QueryClient } from "react-query";

// Definir la URL base para las clases en la API
const BASE_URI = "http://localhost:3000/classes";

// Interfaz que define la estructura de una clase al crearla
export interface IClass {
  language: string; // Idioma de la clase
  teacher: string; // Nombre del profesor
  imgUrl: string; // URL de la imagen asociada a la clase
  students: string[]; // Lista de estudiantes inscritos en la clase
  schedules: string[]; // Horarios de la clase
}

// Respuesta de la API que incluye el ID de la clase
export interface IClassResponse {
  _id: string; // ID único de la clase
  language: string; // Idioma de la clase
  teacher: string; // Nombre del profesor
  imgUrl: string; // URL de la imagen asociada a la clase
  students: string[]; // Lista de estudiantes inscritos en la clase
  schedules: string[]; // Horarios de la clase
}

// Crear una instancia del cliente de consultas de react-query
const queryClient = new QueryClient();

// Hook para obtener todas las clases
export const useGetClass = () => {
  return useQuery("class", async () => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
      },
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};

// Hook para obtener una clase específica por su ID
export const useGetClassById = (id: string) => {
  return useQuery("class", async () => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
      },
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};

// Hook para crear una nueva clase
export const useCreateClass = () => {
  return useMutation(
    async (data: IClass) => {
      const token = localStorage.getItem("token"); // Obtener token de autenticación
      const response = await fetch(`${BASE_URI}`, {
        method: "POST", // Método HTTP POST para crear una clase
        headers: {
          Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
          "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
        },
        body: JSON.stringify(data), // Enviar los datos de la clase en el cuerpo de la solicitud
      });
      return response.json(); // Devolver la respuesta en formato JSON
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("class"); // Invalidar las consultas de clases para actualizarlas
      },
    }
  );
};

// Hook para actualizar los datos de una clase existente
export const useUpdateClass = () => {
  return useMutation(
    async (data: IClassResponse) => {
      console.log("data:", data); // Imprimir los datos para depuración
      const token = localStorage.getItem("token"); // Obtener token de autenticación
      const response = await fetch(`${BASE_URI}/${data._id}`, {
        method: "PUT", // Método HTTP PUT para actualizar una clase
        headers: {
          Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
          "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
        },
        body: JSON.stringify(data), // Enviar los datos actualizados de la clase en el cuerpo de la solicitud
      });
      return response.json(); // Devolver la respuesta en formato JSON
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("class"); // Invalidar las consultas de clases para actualizarlas
      },
    }
  );
};

// Hook para eliminar una clase por su ID
export const useDeleteClass = () => {
  return useMutation(async (id: string) => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}/${id}`, {
      method: "DELETE", // Método HTTP DELETE para eliminar la clase
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
      },
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};

// Hook para buscar clases por idioma
export const useSearchClassByLanguage = (language: string) => {
  return useQuery("class", async () => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}/language/${language}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
      },
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};

// Hook para obtener varias clases por sus IDs
export const useGetAllClassByIds = (ids: string[]) => {
  return useQuery("class", async () => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}ByIds`, {
      method: "POST", // Método HTTP POST para obtener clases por múltiples IDs
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
        "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
      },
      body: JSON.stringify(ids), // Enviar los IDs en el cuerpo de la solicitud
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};

// Hook para obtener las próximas clases por sus IDs
export const useGetNextClasses = (ids: string[]) => {
  return useQuery("nextClasses", async () => {
    const token = localStorage.getItem("token"); // Obtener token de autenticación
    const response = await fetch(`${BASE_URI}Next`, {
      method: "POST", // Método HTTP POST para obtener las próximas clases
      headers: {
        Authorization: `Bearer ${token}`, // Enviar token en el header para autenticación
        "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
      },
      body: JSON.stringify({ ids }), // Enviar los IDs en el cuerpo de la solicitud
    });
    return response.json(); // Devolver la respuesta en formato JSON
  });
};
