import { useMutation, useQuery } from "react-query";

// Interfaces para la estructura de los datos utilizados en el registro, inicio de sesión y verificación del token
export interface ISignInData {
    email: string;   // Correo electrónico del usuario
    password: string; // Contraseña del usuario
}

export interface ISignUpData {
    email: string;   // Correo electrónico del usuario
    password: string; // Contraseña del usuario
    name?: string;   // Nombre del usuario (opcional)
    surname?: string; // Apellido del usuario (opcional)
    mainLanguage?: string; // Idioma principal del usuario (opcional)
    role?: string;   // Rol del usuario (opcional)
    class: string[]; // Lista de clases a las que pertenece el usuario
}

export interface IAuthResponse {
    token: string;   // Token de autenticación del usuario
}

export interface IVerifyResponse {
    authorized: boolean; // Indica si el token es válido
    user: object; // Información del usuario asociado al token
}

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Hook para el registro de un nuevo usuario
export const useRegister = () => {
    // Se utiliza useMutation para manejar la mutación de datos
    return useMutation(async (data: ISignUpData): Promise<IAuthResponse> => {
        // Realiza la solicitud HTTP POST a la ruta de registro
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data), // Cuerpo de la solicitud con los datos de registro
        });

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
            throw new Error("Error al registrarse");
        }

        // Devuelve la respuesta en formato JSON (que contiene el token de autenticación)
        return response.json();
    });
};

// Hook para el inicio de sesión de un usuario existente
export const useLogin = () => {
    // Se utiliza useMutation para manejar la mutación de datos
    return useMutation(async (data: ISignInData): Promise<IAuthResponse> => {
        // Realiza la solicitud HTTP POST a la ruta de login
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data), // Cuerpo de la solicitud con los datos de inicio de sesión
        });

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }

        // Devuelve la respuesta en formato JSON (que contiene el token de autenticación)
        return response.json();
    });
};

// Función para verificar la validez del token
const verifyToken = async (token: string): Promise<IVerifyResponse> => {
    // Realiza la solicitud HTTP POST a la ruta de verificación de token
    const response = await fetch(`${BASE_URL}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Autorización con el token enviado en el header
        },
    });

    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error("Error al verificar el token");
    }

    // Devuelve la respuesta en formato JSON (contiene la autorización y la información del usuario)
    return response.json();
};

// Hook para verificar la validez del token, usando useQuery de React Query
export const useVerifyToken = (token: string) => {
    return useQuery(["verifyToken", token], () => verifyToken(token), {
        // La consulta se activa solo si hay un token presente
        enabled: !!token,
    });
};
