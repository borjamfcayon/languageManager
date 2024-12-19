import { Button, MenuItem, Select, TextField } from "@mui/material"; 
import { useGetUsersByRole } from "../../api/RoleApi"; 
import React from "react"; 
import { IUser } from "../../api/UserApi";
import { Loading } from "../Loading"; 
import { Dispatch, SetStateAction } from "react"; 
import { useCreateClass } from "../../api/ClassApi";
import { useQueryClient } from "react-query"; 

// Componente AddClassForm para añadir una nueva clase
export const AddClassForm = ({
  setOpenAddDialog,
}: {
  setOpenAddDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  // Estado local para manejar los valores de los campos del formulario
  const [language, setLanguage] = React.useState<string>(""); // Estado para el idioma de la clase
  const [teacherID, setTeacherID] = React.useState<string>(""); // Estado para el ID del profesor
  const [imgUrl, setImgUrl] = React.useState<string>(""); // Estado para la URL de la imagen de la clase

  const queryClient = useQueryClient(); // Hook para interactuar con el cliente de React Query y gestionar la caché

  // Hook para obtener los usuarios con el rol de "teacher"
  const { data, isLoading } = useGetUsersByRole("teacher");
  // Hook para crear una nueva clase
  const { mutate: createClass } = useCreateClass();

  // Función para manejar la creación de la clase
  const handleAddClass = () => {
    // Crear un objeto con los datos de la nueva clase
    const newClass = {
      language, // Idioma de la clase
      teacher: teacherID, // ID del profesor asignado
      imgUrl, // URL de la imagen de la clase
      students: [], // Lista de estudiantes (inicialmente vacía)
      schedules: [], // Lista de horarios (inicialmente vacía)
    };
    // Llamar al hook de creación de clase
    createClass(newClass, {
      onSuccess: () => {
        // Invalidar las consultas de clases para asegurarse de que se actualicen después de la creación
        queryClient.invalidateQueries("classes");
        // Cerrar el diálogo de añadir clase
        setOpenAddDialog(false);
      },
    });
  };

  // Si los datos están cargando, mostrar el componente Loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-2">
      {" "}
      {/* Contenedor del formulario */}
      <TextField
        label="Language" // Etiqueta del campo para el idioma
        value={language} // Valor actual del campo
        onChange={(e) => setLanguage(e.target.value)} // Actualiza el valor cuando el usuario cambia el input
      />
      <Select
        value={teacherID} // Valor actual del campo para seleccionar el profesor
        onChange={(e) => {
          const newTeacherID = e.target.value; // Obtiene el nuevo ID del profesor seleccionado
          setTeacherID(newTeacherID); // Actualiza el estado con el nuevo ID
        }}
        displayEmpty // Permite mostrar una opción vacía
      >
        <MenuItem value="" disabled>
          Select a Teacher
        </MenuItem>
        {data?.map((user: IUser) => (
          // Mapeo de los usuarios para crear una opción por cada profesor disponible
          <MenuItem key={user._id} value={user._id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Image URL" // Etiqueta del campo para la URL de la imagen
        value={imgUrl} // Valor actual del campo
        onChange={(e) => setImgUrl(e.target.value)} // Actualiza el estado con la nueva URL
      />
      <div className="w-full flex flex-row gap-2 mt-2">
        {" "}
        {/* Contenedor de botones */}
        <Button
          variant="contained"
          color="inherit"
          onClick={() => setOpenAddDialog(false)}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddClass}>
          Añadir
        </Button>
      </div>
    </div>
  );
};
