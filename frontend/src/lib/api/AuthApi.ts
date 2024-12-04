import { useMutation, useQuery } from "react-query";

export interface ISignInData {
    email: string;
    password: string;
}

export interface ISignUpData {
    email: string;
    password: string;
    name?: string;
    surname?: string;
    mainLanguage?: string;
    role?: string;
    class: string[];
}

export interface IAuthResponse {
    token: string;
}

export interface IVerifyResponse {
    authorized: boolean;
    user: object;
}

const BASE_URL = "http://localhost:3000";

export const useRegister = () => {
    return useMutation(async (data: ISignUpData): Promise<IAuthResponse> => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Error al registrarse");
        }

        return response.json();
    });
};

export const useLogin = () => {
    return useMutation(async (data: ISignInData): Promise<IAuthResponse> => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }

        return response.json();
    });
};

const verifyToken = async (token: string): Promise<IVerifyResponse> => {
    const response = await fetch(`${BASE_URL}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error al verificar el token");
    }

    return response.json();
};

export const useVerifyToken = (token: string) => {
    return useQuery(["verifyToken", token], () => verifyToken(token), {
        enabled: !!token,
    });
};


