import { useQuery, useMutation, QueryClient } from "react-query";
const BASE_URI = "http://localhost:3000/classes";

export interface IClass {
    language: string;
    teacher: string;
    imgUrl: string;
    students: string[];
    schedules: string[];
}

export interface IClassResponse {
    _id: string;
    language: string;
    teacher: string;
    imgUrl: string;
    students: string[];
    schedules: string[];
}

const queryClient = new QueryClient();

export const useGetClass = () => {
    return useQuery("class", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};

export const useGetClassById = (id: string) => {
    return useQuery("class", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};

export const useCreateClass = () => {
    return useMutation(
        async (data: IClass) => {
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
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("class");
            },
        }
    );
};

export const useUpdateClass = () => {
    return useMutation(
        async (data: IClassResponse) => {
            console.log("data:", data)
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
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("class");
            },
        }
    );
};

export const useDeleteClass = () => {
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

export const useSearchClassByLanguage = (language: string) => {
    return useQuery("class", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}/language/${language}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    });
};

export const useGetAllClassByIds = (ids: string[]) => {
    return useQuery("class", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}ByIds`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
        });
        return response.json();
    }
    );
}

export const useGetNextClasses = (ids: string[]) => {
    return useQuery("nextClasses", async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URI}Next`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ids }),
        });
        return response.json();
    });
};
