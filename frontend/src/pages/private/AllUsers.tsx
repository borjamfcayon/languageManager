import { Plus, Trash } from "lucide-react";
import { IUser, useDeleteUser, useGetUsers } from "../../lib/api/UserApi";
import { Loading } from "../../lib/components/Loading";
import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ISignUpData, useRegister } from "../../lib/api/AuthApi";
import { RegisterForm } from "../../lib/components/RegisterForm";

export const AllUsers = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: registerUser } = useRegister();

  const handleDelete = () => {
    if (user) {
      deleteUser(user._id, {
        onSuccess: () => {
          queryClient.resetQueries("users");
        },
      });
      setOpenDialog(false);
    }
  };

  const handleRegister = () => {
    const newUser: ISignUpData = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      mainLanguage: "es",
      role: role,
      class: [],
    };

    registerUser(newUser, {
      onSuccess: () => {
        queryClient.resetQueries("users");
        setOpenAddDialog(false);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md gap-4 p-8">
      <div className="w-full flex flex-row justify-center items-center p-2">
        <h2 className="text-lg font-bold">All Users</h2>
        <Plus
          size={30}
          className="m-12 cursor-pointer filter hover:shadow-md hover:border-4 hover:border-blue-500 rounded-md"
          onClick={() => setOpenAddDialog(true)}
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-2">
        {data?.map((user: IUser) => (
          <div
            key={user._id}
            className="flex flex-row justify-between items-center gap-2 bg-gray-100 rounded-md shadow-md p-4"
          >
            <div className="">
              <p>
                {user.name} {user.surname}
              </p>
              <p>{user.email}</p>
            </div>
            <button>
              <Trash
                size={20}
                onClick={() => {
                  setOpenDialog(true);
                  setUser(user);
                }}
              />
            </button>
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        color="inherit"
        onClick={() => navigate("/private")}
      >
        Volver
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="flex flex-col justify-center items-center gap-2 p-4">
          <p className="text-xl font-bold">
            Seguro de eliminar a {user?.name}?
          </p>
          <div className="flex flex-row gap-2 p-4">
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setOpenDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <div className="bg-white flex flex-col justify-center items-center rounded shadow-md p-6">
          <RegisterForm
            handleRegister={handleRegister}
            register={true}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
            setSurname={setSurname}
            email={email}
            password={password}
            name={name}
            surname={surname}
            role={role}
            setRole={setRole}
          />
          <div className="flex flex-row justify-center items-center gap-2">
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setOpenAddDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Añadir Usuario
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
