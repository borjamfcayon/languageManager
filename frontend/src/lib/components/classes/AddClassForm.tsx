import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useGetUsersByRole } from "../../api/RoleApi";
import React from "react";
import { IUser } from "../../api/UserApi";
import { Loading } from "../Loading";
import { Dispatch, SetStateAction } from "react";
import { useCreateClass } from "../../api/ClassApi";
import { useQueryClient } from "react-query";

export const AddClassForm = ({ setOpenAddDialog }: { setOpenAddDialog: Dispatch<SetStateAction<boolean>> }) => {
    const [language, setLanguage] = React.useState<string>("");
    const [teacherID, setTeacherID] = React.useState<string>("");
    const [imgUrl, setImgUrl] = React.useState<string>("");

    const queryClient = useQueryClient();

    const { data, isLoading } = useGetUsersByRole("teacher");
    const { mutate: createClass } = useCreateClass();

    const handleAddClass = () => {
        const newClass = {
            language,
            teacher: teacherID,
            imgUrl,
            students: [],
            schedules: [],
        };
        createClass(newClass, {
            onSuccess: () => {
                queryClient.invalidateQueries("classes");
                setOpenAddDialog(false);
            },
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-2">
            <TextField
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            />
            <Select
                value={teacherID}
                onChange={(e) => {
                    const newTeacherID = e.target.value;
                    setTeacherID(newTeacherID);
                }}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    Select a Teacher
                </MenuItem>
                {data?.map((user: IUser) => (
                    <MenuItem key={user._id} value={user._id}>
                        {user.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                label="Image URL"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
            />
            <div className="w-full flex flex-row gap-2 mt-2">
                <Button variant="contained" color="inherit" onClick={() => setOpenAddDialog(false)}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary" onClick={handleAddClass}>
                    Añadir
                </Button>
            </div>
        </div>
    );
};
