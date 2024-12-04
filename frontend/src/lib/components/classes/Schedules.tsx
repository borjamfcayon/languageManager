import { IScheduleResponse, useDeleteSchedule, useGetSchedulesByIds } from "../../api/ScheduleApi";
import { useRole } from "../../../context/RoleContext";
import { Button } from "@mui/material";
import { useQueryClient } from "react-query";
import { IUser, useGetUserInfo, useUpdateUser } from "../../api/UserApi";
import { IClassResponse, useUpdateClass } from "../../api/ClassApi";
import { Loading } from "../Loading";

export const Schedules = ({ schedules, classData }: { schedules: string[], classData: IClassResponse }) => {
    const role = useRole();

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useGetSchedulesByIds(schedules.length > 0 ? schedules : []);
    const { mutate: deleteSchedule } = useDeleteSchedule();
    const { mutate: updateClass } = useUpdateClass();
    const { mutate: updateUser } = useUpdateUser();
    const { data: userData, isLoading: userLoading } = useGetUserInfo();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {String(error)}</div>;
    }
    if (!data) {
        return <div>No schedules found</div>;
    }

    const handleDelete = async (id: string) => {
        await deleteSchedule(id, { onSuccess: () => queryClient.invalidateQueries("schedules") });
    };

    const handleUpdateUser = () => {

        const deleteClass = userData?.class?.filter((classId) => classId !== classData._id);

        const newUser: IUser = {
            name: userData?.name || "",
            surname: userData?.surname || "",
            mainLanguage: userData?.mainLanguage || "",
            email: userData?.email || "",
            _id: userData?._id || "",
            class: userData?.class?.find((classId) => classId === classData._id) ? deleteClass : [...(userData?.class ?? []), classData._id],
        };

        updateUser(newUser, { onSuccess: () => queryClient.invalidateQueries("user") });

        const newStudents = classData.students.find((studentId) => studentId === userData?._id)
            ? [...classData.students, userData?._id].filter((id): id is string => !!id)
            : classData.students.filter((studentId) => studentId !== userData?._id)

        const newClass: IClassResponse = {
            _id: classData._id,
            imgUrl: classData.imgUrl,
            language: classData.language,
            teacher: classData.teacher,
            students:
                [...new Set(newStudents)],
            schedules: classData.schedules,
        };

        updateClass(newClass, { onSuccess: () => queryClient.invalidateQueries("class") });
    };

    if (userLoading) { <Loading /> }

    return (
        <div className="flex flex-col gap-8">
            {data.map((schedule: IScheduleResponse) => (
                <div key={schedule._id} className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <h5 className="text-2xl font-bold">{schedule.day}</h5>
                    </div>
                    <div className="col-span-1">
                        <p className="text-2xl">{schedule.hours}:00</p>
                    </div>
                    {role === "admin" && (
                        <div className="col-span-1">
                            <Button variant="contained" color="error" onClick={() => handleDelete(schedule._id)}>
                                Eliminar
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            <div className="flex flex-row gap-2 justify-center items-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateUser}
                    className="mt-2"
                >
                    {userData?.class?.find((classId) => classId === classData._id) ? 'Salir de la clase' : 'Unirme a la clase'}
                </Button>
            </div>
        </div>
    );
};
