import { useQuery, useMutation } from "react-query";
const BASE_URI = "http://localhost:3000/schedules";
export interface ISchedule {
    day: string;
    hours: number[];
}
export interface IScheduleResponse {
    _id: string;
    day: string;
    hours: number[];
}
export const useGetSchedule = () => {
    return useQuery("schedule", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};
export const useGetScheduleById = (id: string) => {
    return useQuery("schedule", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};
export const useCreateSchedule = () => {
    return useMutation(async (data: ISchedule) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    });
};
export const useUpdateSchedule = () => {
    return useMutation(async (data: IScheduleResponse) => {
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
    });
};
export const useDeleteSchedule = () => {
    return useMutation(async (id: string) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};
export const useGetSchedulesByIds = (ids: string[]) => {
    return useQuery("schedules", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/ids`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ ids }),
        });
        return response.json();
    });
};