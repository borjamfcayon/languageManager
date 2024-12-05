import { useQuery } from "react-query";
const BASE_URI = "http://localhost:3000/role";
export const useGetRole = () => {
    return useQuery("role", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};

export const useGetUsersByRole = (role: string) => {
    return useQuery("usersByRole", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${role}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.json();
    });
};
