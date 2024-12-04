import React from "react";
import { IClassResponse, useGetClass } from "../../api/ClassApi";
import { Dialog } from "@mui/material";
import { Plus, X } from "lucide-react";
import { useRole } from "../../../context/RoleContext";
import { Schedules } from "./Schedules";
import { AddClassForm } from "./AddClassForm";
import { AddScheduleForm } from "./AddScheduleForm";
import { Loading } from "../Loading";

export const Languages = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [viewAddSchedule, setViewAddSchedule] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [selectedSchedules, setSelectedSchedules] = React.useState<string[]>([""]);
    const { data, isLoading } = useGetClass();
    const role = useRole();

    if (isLoading) {
        return <Loading />;
    }

    if (!data || data.length === 0) {
        return <div>No classes found</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <div className="flex w-full flex-row justify-center items-center">
                <h5 className="text-3xl font-bold">Clases</h5>
                {role === "admin" && (
                    <button className="ml-16" onClick={() => setOpenAddDialog(true)}>
                        <Plus size={30} />
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-6 p-4">
                {data.map((language: IClassResponse) => (
                    <div
                        className="flex justify-center items-center"
                        key={crypto.randomUUID()}
                    >
                        <img
                            className="rounded aspect-video cursor-pointer filter shadow-md hover:border-4 hover:border-blue-500"
                            onClick={() => {
                                setOpenDialog(true);
                                setSelectedSchedules(language.schedules);
                                setSelectedLanguage(language.language);
                            }}
                            src={language.imgUrl}
                            alt={language.language}
                        />
                    </div>
                ))}
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div className="bg-white flex flex-col justify-start items-center gap-4 rounded-md shadow-md p-4">
                    <div className="w-full flex flex-row justify-between items-center">
                        <h4 className="text-3xl font-bold">
                            Clases de {selectedLanguage} disponibles:
                        </h4>
                        {(role === "admin" || role === "teacher") && (
                            viewAddSchedule ? (
                                <X size={30} className="cursor-pointer" onClick={() => setViewAddSchedule(false)} />
                            ) : (
                                <Plus size={30} className="cursor-pointer" onClick={() => setViewAddSchedule(true)} />
                            )
                        )}
                    </div>
                    {viewAddSchedule ? (
                        <AddScheduleForm setView={setViewAddSchedule} classData={data.find((language: IClassResponse) => language.language === selectedLanguage)} />
                    ) : (
                        <Schedules schedules={selectedSchedules} classData={data.find((language: IClassResponse) => language.language === selectedLanguage)} />
                    )}
                </div>
            </Dialog>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <div className="bg-white flex flex-col justify-center items-center gap-4 rounded-md shadow-md p-4">
                    <h4 className="text-3xl font-bold">Añadir Clase</h4>
                    <AddClassForm setOpenAddDialog={setOpenAddDialog} />
                </div>
            </Dialog>
        </div>
    );
};
