import React from "react";
import { IClassResponse, useGetClass } from "../../api/ClassApi";
import { Dialog } from "@mui/material";
import { Plus, X } from "lucide-react";
import { useRole } from "../../../context/RoleContext";
import { Schedules } from "./Schedules";
import { AddClassForm } from "./AddClassForm";
import { AddScheduleForm } from "./AddScheduleForm";
import { Loading } from "../Loading";

// Componente principal para mostrar y gestionar clases de idiomas
export const Languages = () => {
  // Estado para controlar la apertura de los diálogos
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [viewAddSchedule, setViewAddSchedule] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(""); // Almacena el idioma seleccionado
  const [selectedSchedules, setSelectedSchedules] = React.useState<string[]>([
    "",
  ]); // Almacena los horarios seleccionados
  const { data, isLoading } = useGetClass(); // Hook para obtener las clases disponibles
  const role = useRole(); // Hook para obtener el rol del usuario (admin, teacher, etc.)

  // Si los datos están cargando, mostrar el componente de carga
  if (isLoading) {
    return <Loading />;
  }

  // Si no hay clases disponibles, mostrar un mensaje
  if (!data || data.length === 0) {
    return <div>No classes found</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {/* Título de la sección de clases */}
      <div className="flex w-full flex-row justify-center items-center">
        <h5 className="text-3xl font-bold">Clases</h5>
        {/* Si el rol es admin, mostrar el botón para añadir una nueva clase */}
        {role === "admin" && (
          <button className="ml-16" onClick={() => setOpenAddDialog(true)}>
            <Plus size={30} />
          </button>
        )}
      </div>

      {/* Contenedor de las clases disponibles */}
      <div className="grid grid-cols-2 grid-rows-2 gap-6 p-4">
        {data.map((language: IClassResponse) => (
          <div
            className="flex justify-center items-center"
            key={crypto.randomUUID()} // Generar un ID único para cada clase
          >
            {/* Imagen de la clase con un evento onClick para seleccionar la clase */}
            <img
              className="rounded aspect-video cursor-pointer filter shadow-md hover:border-4 hover:border-blue-500"
              onClick={() => {
                setOpenDialog(true); // Abrir el diálogo de clase
                setSelectedSchedules(language.schedules); // Establecer los horarios de la clase seleccionada
                setSelectedLanguage(language.language); // Establecer el idioma de la clase seleccionada
              }}
              src={language.imgUrl} // URL de la imagen de la clase
              alt={language.language} // Texto alternativo para la imagen
            />
          </div>
        ))}
      </div>

      {/* Diálogo para mostrar los detalles de la clase seleccionada */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="bg-white flex flex-col justify-start items-center gap-4 rounded-md shadow-md p-4">
          <div className="w-full flex flex-row justify-between items-center">
            {/* Título del diálogo mostrando el idioma seleccionado */}
            <h4 className="text-3xl font-bold">
              Clases de {selectedLanguage} disponibles:
            </h4>
            {/* Si el usuario tiene el rol de admin o teacher, mostrar los iconos para añadir horarios */}
            {(role === "admin" || role === "teacher") &&
              (viewAddSchedule ? (
                // Si se está viendo el formulario de añadir horario, mostrar el ícono de cerrar
                <X
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setViewAddSchedule(false)}
                />
              ) : (
                // Si no se está viendo el formulario de añadir horario, mostrar el ícono de añadir
                <Plus
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setViewAddSchedule(true)}
                />
              ))}
          </div>

          {/* Mostrar el formulario de añadir horario o los horarios de la clase seleccionada */}
          {viewAddSchedule ? (
            <AddScheduleForm
              setView={setViewAddSchedule}
              classData={data.find(
                (language: IClassResponse) =>
                  language.language === selectedLanguage
              )}
            />
          ) : (
            <Schedules
              schedules={selectedSchedules}
              classData={data.find(
                (language: IClassResponse) =>
                  language.language === selectedLanguage
              )}
            />
          )}
        </div>
      </Dialog>

      {/* Diálogo para añadir una nueva clase */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <div className="bg-white flex flex-col justify-center items-center gap-4 rounded-md shadow-md p-4">
          <h4 className="text-3xl font-bold">Añadir Clase</h4>
          {/* Componente para el formulario de añadir clase */}
          <AddClassForm setOpenAddDialog={setOpenAddDialog} />
        </div>
      </Dialog>
    </div>
  );
};
