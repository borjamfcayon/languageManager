import { useEffect } from "react";
import { IUser, useGetAllUsersByIds } from "../../api/UserApi";

// Componente que muestra la lista de estudiantes de una clase, basado en los IDs proporcionados
export const SecondClassUsers = ({
  currentUsersIds,
}: {
  currentUsersIds: string[] | null | undefined;
}) => {
  // Si no hay IDs de estudiantes, se asigna un array vacío
  const validUsersIds = currentUsersIds ?? [];

  // Hook para obtener los estudiantes por sus IDs
  const {
    data: students, // Los estudiantes obtenidos
    isLoading: loadingStudents, // Indicador de carga mientras se obtienen los estudiantes
    refetch: refetchStudents, // Función para volver a obtener los estudiantes
  } = useGetAllUsersByIds(validUsersIds); // Llama al hook pasando los IDs válidos

  // Efecto para volver a obtener los estudiantes cuando los IDs cambian
  useEffect(() => {
    // Si hay IDs de estudiantes, vuelve a realizar la consulta para obtenerlos
    if (validUsersIds.length > 0) {
      refetchStudents();
    }
  }, [validUsersIds, refetchStudents]); // Dependencias: se ejecuta cuando cambian los IDs de los estudiantes o la función de refetch

  // Si los estudiantes están siendo cargados, muestra un indicador de carga
  if (loadingStudents) {
    return <div>Loading...</div>;
  }

  // Si no hay estudiantes o no se obtuvieron, muestra un mensaje informando que no se encontraron estudiantes
  if (!students || students.length === 0) {
    return <div>No students found</div>;
  }

  // Si hay estudiantes, los muestra en una lista
  return (
    <div className="flex flex-col gap-2">
      {students.map((student: IUser) => (
        // Muestra el nombre de cada estudiante de la clase
        <div key={student._id} className="flex gap-2 items-center">
          <h6 className="text-md ">- {student.name}</h6>{" "}
          {/* Muestra el nombre del estudiante */}
        </div>
      ))}
    </div>
  );
};
