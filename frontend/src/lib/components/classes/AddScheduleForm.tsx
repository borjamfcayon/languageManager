import React, { Dispatch, SetStateAction } from "react";
import { Select, MenuItem, Button } from "@mui/material";
import { ISchedule, useCreateSchedule } from "../../api/ScheduleApi";
import { IClassResponse, useUpdateClass } from "../../api/ClassApi";
import { useQueryClient } from "react-query";

export const AddScheduleForm = ({ setView, classData }: { setView: Dispatch<SetStateAction<boolean>>, classData: IClassResponse }) => {
    const [schedule, setSchedule] = React.useState<ISchedule>({ day: "", hours: [] });

    const queryClient = useQueryClient();

    const { mutate: createSchedule } = useCreateSchedule();
    const { mutate: updateClass } = useUpdateClass();

    const handleAddSchedule = () => {

        createSchedule(schedule, {
            onSuccess: (response: IClassResponse) => {
                const updatedSchedules = Array.isArray(classData.schedules)
                    ? [...classData.schedules, response._id]
                    : [response._id];

                const newClassData: IClassResponse = {
                    _id: classData._id,
                    imgUrl: classData.imgUrl,
                    language: classData.language,
                    teacher: classData.teacher,
                    students: classData.students,
                    schedules: updatedSchedules,
                };

                updateClass(newClassData, {
                    onSuccess: () => {
                        queryClient.resetQueries("class");
                        queryClient.resetQueries("schedules");
                        setView(false);
                    },
                    onError: (error) => {
                        console.error("Error updating class:", error);
                    }
                });
            },

            onError: (error) => {
                console.error("Error creating schedule:", error);
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <Select
                value={schedule.day}
                onChange={(e) => setSchedule({ ...schedule, day: e.target.value })}
                displayEmpty
            >
                <MenuItem value="" disabled>Selecciona un día</MenuItem>
                <MenuItem value="monday">Lunes</MenuItem>
                <MenuItem value="tuesday">Martes</MenuItem>
                <MenuItem value="wednesday">Miercoles</MenuItem>
                <MenuItem value="thursday">Jueves</MenuItem>
                <MenuItem value="friday">Viernes</MenuItem>
            </Select>
            <Select
                value={schedule.hours}
                onChange={(e) => setSchedule({ ...schedule, hours: e.target.value as number[] })}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    Selecciona una hora
                </MenuItem>
                <MenuItem value={8}>8:00 AM</MenuItem>
                <MenuItem value={10}>10:00 AM</MenuItem>
                <MenuItem value={12}>12:00 PM</MenuItem>
                <MenuItem value={14}>2:00 PM</MenuItem>
                <MenuItem value={16}>4:00 PM</MenuItem>
                <MenuItem value={18}>6:00 PM</MenuItem>
                <MenuItem value={20}>8:00 PM</MenuItem>
            </Select>
            <div className="w-full flex flex-row gap-2 mt-2">
                <Button variant="contained" color="inherit" onClick={() => setView(false)}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleAddSchedule}>
                    Añadir
                </Button>
            </div>
        </div>
    );
};
