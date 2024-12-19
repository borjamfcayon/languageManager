import { useQuery, useMutation, QueryClient } from "react-query"; 
import { ISignUpData } from "./AuthApi"; 

const BASE_URI = "http://localhost:3000/users"; // URL base para interactuar con la API de usuarios.

// Definición de la interfaz IUser que extiende ISignUpData, pero omite la propiedad "password"
export interface IUser extends Omit<ISignUpData, "password"> {
  _id: string; // ID único del usuario
  class: string[]; // Clases a las que está asignado el usuario
}

// Hook para obtener todos los usuarios
export const useGetUsers = () => {
  const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
  return useQuery("users", async () => {
    const response = await fetch(`${BASE_URI}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Retornar la respuesta de la API en formato JSON
  });
};

// Hook para obtener la información del usuario actual (usando el token de autenticación)
export const useGetUserInfo = () => {
  const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
  return useQuery<IUser>("user", async () => {
    const response = await fetch(`${BASE_URI}Info`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Retornar la respuesta de la API en formato JSON
  });
};

// Hook para obtener un usuario específico por su ID
export const useGetUserById = (id: string) => {
  const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
  return useQuery("user", async () => {
    const response = await fetch(`${BASE_URI}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Retornar la respuesta de la API en formato JSON
  });
};

// Hook para actualizar la información de un usuario
export const useUpdateUser = () => {
  const queryClient = new QueryClient(); // Crear un cliente de consulta para invalidar las consultas después de la mutación
  return useMutation(
    async (data: IUser) => {
      console.log("returnuseMutation - data:", data); // Imprimir los datos que se van a actualizar
      const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
      const response = await fetch(`${BASE_URI}/${data._id}`, {
        method: "PUT", // Método PUT para actualizar el usuario
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
          "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
        },
        body: JSON.stringify(data), // Convertir los datos del usuario a formato JSON
      });
      return response.json(); // Retornar la respuesta de la API en formato JSON
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users"); // Invalidar la caché de la consulta de usuarios después de la mutación exitosa
      },
    }
  );
};

// Hook para eliminar un usuario por su ID
export const useDeleteUser = () => {
  const queryClient = new QueryClient(); // Crear un cliente de consulta para invalidar las consultas después de la mutación
  return useMutation(
    async (id: string) => {
      const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
      const response = await fetch(`${BASE_URI}/${id}`, {
        method: "DELETE", // Método DELETE para eliminar el usuario
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
        },
      });
      return response.json(); // Retornar la respuesta de la API en formato JSON
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users"); // Invalidar la caché de la consulta de usuarios después de la mutación exitosa
      },
    }
  );
};

// Hook para obtener todos los usuarios de una clase específica
export const useGetAllUsersOfAClass = (classId: string) => {
  const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
  return useQuery("users", async () => {
    const response = await fetch(`${BASE_URI}Info/${classId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
      },
    });
    return response.json(); // Retornar la respuesta de la API en formato JSON
  });
};

// Hook para obtener múltiples usuarios a partir de sus IDs
export const useGetAllUsersByIds = (ids: string[]) => {
  const token = localStorage.getItem("token"); // Obtener el token de autenticación almacenado en localStorage
  return useQuery("users", async () => {
    const response = await fetch(`${BASE_URI}ByIds`, {
      method: "POST", // Método POST para obtener múltiples usuarios por sus IDs
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en los encabezados para autenticar la solicitud
        "Content-Type": "application/json", // Establecer el tipo de contenido como JSON
      },
      body: JSON.stringify({ userIds: ids }), // Enviar los IDs de los usuarios en el cuerpo de la solicitud
    });

    if (!response.ok) {
      const error = await response.json(); // Obtener el error si la respuesta no es exitosa
      throw new Error(error.message || "Failed to fetch users"); // Lanza un error si la solicitud falla
    }

    return response.json(); // Retornar la respuesta de la API en formato JSON
  });
};
