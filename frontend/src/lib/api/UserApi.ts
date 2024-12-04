import { useQuery, useMutation, QueryClient } from "react-query";
import { ISignUpData } from "./AuthApi";


const BASE_URI = "http://localhost:3000/users";

export interface IUser extends Omit<ISignUpData, "password"> {
    _id: string;
    class: string[];
}

export const useGetUsers = () => {
    const token = localStorage.getItem("token");
    return useQuery("users", async () => {
        const response = await fetch(`${BASE_URI}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
}

export const useGetUserInfo = () => {
    const token = localStorage.getItem("token");
    return useQuery<IUser>("user", async () => {
        const response = await fetch(`${BASE_URI}Info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
}

export const useGetUserById = (id: string) => {
    const token = localStorage.getItem("token");
    return useQuery("user", async () => {
        const response = await fetch(`${BASE_URI}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
}

export const useUpdateUser = () => {
    const queryClient = new QueryClient();
    return useMutation(async (data: IUser) => {
        console.log("returnuseMutation - data:", data)
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${data._id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
}

export const useDeleteUser = () => {
    const queryClient = new QueryClient();
    return useMutation(async (id: string) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        },
    });
}

export const useGetAllUsersOfAClass = (classId: string) => {
    const token = localStorage.getItem("token");
    return useQuery("users", async () => {
        const response = await fetch(`${BASE_URI}Info/${classId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
}

export const useGetAllUsersByIds = (ids: string[]) => {
    const token = localStorage.getItem("token");
    return useQuery("users", async () => {
        const response = await fetch(`${BASE_URI}ByIds`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userIds: ids }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch users");
        }

        return response.json();
    });
};
