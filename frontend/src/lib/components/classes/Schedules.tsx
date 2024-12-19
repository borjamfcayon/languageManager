import {
  IScheduleResponse,
  useDeleteSchedule,
  useGetSchedulesByIds,
} from "../../api/ScheduleApi";
import { useRole } from "../../../context/RoleContext";
import { Button } from "@mui/material";
import { useQueryClient } from "react-query";
import { IUser, useGetUserInfo, useUpdateUser } from "../../api/UserApi";
import { IClassResponse, useUpdateClass } from "../../api/ClassApi";
import { Loading } from "../Loading";

// Días de la semana con su nombre en español
const days = [
  { day: "monday", name: "Lunes" },
  { day: "tuesday", name: "Martes" },
  { day: "wednesday", name: "Miércoles" },
  { day: "thursday", name: "Jueves" },
  { day: "friday", name: "Viernes" },
  { day: "saturday", name: "Sábado" },
  { day: "sunday", name: "Domingo" },
];

// Componente para mostrar los horarios de una clase
export const Schedules = ({
  schedules, // Lista de IDs de horarios
  classData, // Datos de la clase
}: {
  schedules: string[]; // IDs de los horarios de la clase
  classData: IClassResponse; // Datos completos de la clase
}) => {
  const role = useRole(); // Obtiene el rol del usuario (admin, teacher, etc.)

  const queryClient = useQueryClient(); // Cliente de react-query para invalidar y actualizar cachés de consultas

  // Obtiene los horarios de los IDs proporcionados
  const { data, isLoading, error } = useGetSchedulesByIds(
    schedules.length > 0 ? schedules : []
  );

  // Mutaciones para eliminar un horario, actualizar la clase y actualizar al usuario
  const { mutate: deleteSchedule } = useDeleteSchedule();
  const { mutate: updateClass } = useUpdateClass();
  const { mutate: updateUser } = useUpdateUser();

  // Obtiene la información del usuario actual
  const { data: userData, isLoading: userLoading } = useGetUserInfo();

  // Si los horarios están cargando, muestra un mensaje de carga
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si ocurre un error al obtener los horarios, muestra el error
  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  // Si no hay horarios disponibles, muestra un mensaje indicando que no se encontraron horarios
  if (!data) {
    return <div>No schedules found</div>;
  }

  // Función para manejar la eliminación de un horario
  const handleDelete = async (id: string) => {
    await deleteSchedule(id, {
      onSuccess: () => queryClient.invalidateQueries("schedules"), // Invalida la consulta de horarios después de eliminar uno
    });
  };

  // Función para manejar la actualización de las clases del usuario (unirse o salir de una clase)
  const handleUpdateUser = () => {
    // Verifica si el usuario ya está inscrito en la clase
    const isUserInClass = classData.students.includes(userData?._id || "");

    // Actualiza las clases del usuario, agregando o eliminando la clase actual
    const updatedUserClasses = isUserInClass
      ? userData?.class?.filter((classId) => classId !== classData._id)
      : [...(userData?.class ?? []), classData._id];

    const newUser: IUser = {
      ...userData!,
      class: updatedUserClasses, // Asigna las nuevas clases al usuario
    };

    // Actualiza los datos del usuario en la base de datos
    updateUser(newUser, {
      onSuccess: () => queryClient.invalidateQueries("user"), // Invalida la consulta de usuario
    });

    // Actualiza la lista de estudiantes de la clase, agregando o eliminando al usuario
    const newStudents = isUserInClass
      ? classData.students.filter((studentId) => studentId !== userData?._id)
      : [...classData.students, userData?._id].filter(
          (id): id is string => !!id
        );

    const newClass: IClassResponse = {
      ...classData,
      students: [...new Set(newStudents)], // Asegura que no haya estudiantes duplicados
    };

    // Actualiza los datos de la clase
    updateClass(newClass, {
      onSuccess: () => queryClient.invalidateQueries("class"), // Invalida la consulta de la clase
    });
  };

  // Si los datos del usuario están cargando, muestra el indicador de carga
  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Muestra los horarios de la clase */}
      {data.map((schedule: IScheduleResponse) => (
        <div key={schedule._id} className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            {/* Muestra el día de la semana correspondiente al horario */}
            <h5 className="text-2xl font-bold">
              {days.find((d) => d.day === schedule.day)?.name}
            </h5>
          </div>
          <div className="col-span-1">
            {/* Muestra la hora del horario */}
            <p className="text-2xl">{schedule.hours}:00</p>
          </div>
          {/* Si el usuario es administrador, muestra el botón para eliminar el horario */}
          {role === "admin" && (
            <div className="col-span-1">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(schedule._id)}
              >
                Eliminar
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Muestra el botón para unirse o salir de la clase */}
      <div className="flex flex-row gap-2 justify-center items-center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateUser}
          className="mt-2"
        >
          {/* Cambia el texto del botón según si el usuario está inscrito en la clase */}
          {userData?.class?.find((classId) => classId === classData._id)
            ? "Salir de la clase"
            : "Unirme a la clase"}
        </Button>
      </div>
    </div>
  );
};
