import { Trash } from "lucide-react";
import { IUser, useDeleteUser, useGetUsers } from "../../lib/api/UserApi";
import { Loading } from "../../lib/components/Loading";
import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const AllUsers = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetUsers();
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = () => {
        if (user) {
            deleteUser(user._id, {
                onSuccess: () => {
                    queryClient.resetQueries("users");
                }
            });
            setOpenDialog(false);
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md gap-4 p-8">
            <h2 className="text-lg font-bold">All Users</h2>

            <div className="w-full grid grid-cols-4 gap-2">
                {data?.map((user: IUser) => (
                    <div key={user._id} className="flex flex-row justify-between items-center gap-2 bg-gray-100 rounded-md shadow-md p-4" >
                        <div className="">
                            <p>{user.name} {user.surname}</p>
                            <p>{user.email}</p>
                        </div>
                        <button>
                            <Trash size={20} onClick={() => {
                                setOpenDialog(true)
                                setUser(user)
                            }} />
                        </button>
                    </div>
                ))}
            </div>
            <Button variant="contained" color="inherit" onClick={() => navigate("/private")}>Volver</Button>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <div className="flex flex-col justify-center items-center gap-2 p-4">
                    <p className="text-xl font-bold">Seguro de eliminar a {user?.name}?</p>
                    <div className="flex flex-row gap-2 p-4">
                        <Button variant="contained" color="inherit" onClick={() => setOpenDialog(false)}>Cancelar</Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}