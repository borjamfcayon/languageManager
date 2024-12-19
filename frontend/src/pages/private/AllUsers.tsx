import { Plus, Trash } from "lucide-react";
import { IUser, useDeleteUser, useGetUsers } from "../../lib/api/UserApi";
import { Loading } from "../../lib/components/Loading";
import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ISignUpData, useRegister } from "../../lib/api/AuthApi";
import { RegisterForm } from "../../lib/components/RegisterForm";

// Componente que muestra la lista de todos los usuarios
export const AllUsers = () => {
  // Estados locales para manejar los diálogos y datos de usuario
  const [openDialog, setOpenDialog] = useState(false); // Estado para abrir/cerrar el diálogo de confirmación de eliminación
  const [openAddDialog, setOpenAddDialog] = useState(false); // Estado para abrir/cerrar el diálogo de registro de nuevo usuario
  const [user, setUser] = useState<IUser | null>(null); // Estado para almacenar el usuario seleccionado para eliminar
  const [email, setEmail] = useState(""); // Estado para almacenar el email del nuevo usuario
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña del nuevo usuario
  const [name, setName] = useState(""); // Estado para almacenar el nombre del nuevo usuario
  const [surname, setSurname] = useState(""); // Estado para almacenar el apellido del nuevo usuario
  const [role, setRole] = useState(""); // Estado para almacenar el rol del nuevo usuario

  // Instancia del hook de navegación y de React Query
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Hook para obtener la lista de usuarios y el estado de carga
  const { data, isLoading } = useGetUsers();
  // Hook para eliminar usuarios
  const { mutate: deleteUser } = useDeleteUser();
  // Hook para registrar un nuevo usuario
  const { mutate: registerUser } = useRegister();

  // Función que maneja la eliminación de un usuario
  const handleDelete = () => {
    if (user) {
      deleteUser(user._id, {
        onSuccess: () => {
          // Se restablecen las consultas de usuarios para actualizar la lista
          queryClient.resetQueries("users");
        },
      });
      setOpenDialog(false); // Cerrar el diálogo después de eliminar
    }
  };

  // Función que maneja el registro de un nuevo usuario
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

    // Se realiza el registro con los datos proporcionados
    registerUser(newUser, {
      onSuccess: () => {
        // Se restablecen las consultas de usuarios para reflejar el nuevo registro
        queryClient.resetQueries("users");
        setOpenAddDialog(false); // Cerrar el diálogo de añadir usuario
      },
      onError: (error) => {
        console.error(error); // Manejo de errores durante el registro
      },
    });
  };

  // Si los datos aún están cargando, se muestra un componente Loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-md shadow-md gap-4 p-8">
      {/* Título y botón para agregar un nuevo usuario */}
      <div className="w-full flex flex-row justify-center items-center p-2">
        <h2 className="text-lg font-bold">All Users</h2>
        <Plus
          size={30}
          className="m-12 cursor-pointer filter hover:shadow-md hover:border-4 hover:border-blue-500 rounded-md"
          onClick={() => setOpenAddDialog(true)} // Abre el diálogo para agregar un nuevo usuario
        />
      </div>

      {/* Lista de usuarios */}
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
                  setOpenDialog(true); // Abre el diálogo de confirmación para eliminar
                  setUser(user); // Asigna el usuario seleccionado para eliminar
                }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Botón para navegar a la página privada */}
      <Button
        variant="contained"
        color="inherit"
        onClick={() => navigate("/private")}
      >
        Volver
      </Button>

      {/* Diálogo de confirmación para eliminar un usuario */}
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

      {/* Diálogo para agregar un nuevo usuario */}
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
