import { useMemo } from "react";
import { IUser } from "../../api/UserApi";
import { Loading } from "../Loading";
import { useGetAllClassByIds } from "../../api/ClassApi";
import { SecondClassUsers } from "./SecondClassUsers";

// Componente que muestra los usuarios de la clase actual del usuario
export const ClassUsers = ({
  page, // Página actual de la paginación
  userInfo, // Información del usuario que contiene las clases a las que pertenece
}: {
  page: number; // Número de la página actual
  userInfo?: IUser; // Información del usuario (opcional)
}) => {
  // Hook para obtener todas las clases a las que pertenece el usuario
  const { data: classes, isLoading: loadingClasses } = useGetAllClassByIds(
    userInfo?.class ?? [] // Si no hay clases, pasa un array vacío
  );

  // Calcula los IDs de los estudiantes de la clase actual, memorizado para evitar cálculos innecesarios
  const currentUsersIds = useMemo(() => {
    // Si no se han cargado las clases o la clase actual no existe, retorna null
    if (!classes || !Array.isArray(classes) || !classes[page]) {
      return null;
    }
    return classes[page].students ?? null; // Devuelve los IDs de los estudiantes de la clase actual
  }, [classes, page]); // Se vuelve a calcular solo si las clases o la página cambian

  // Si se está cargando la información de las clases, muestra el indicador de carga
  if (loadingClasses) {
    return <Loading />;
  }

  // Si el usuario no tiene clases asignadas, muestra un mensaje informando que no se han encontrado clases
  if (!userInfo?.class?.length || userInfo?.class?.[0] === "") {
    return <div>No classes found</div>;
  }

  return (
    <div>
      {/* Muestra el nombre de la clase si existe */}
      {classes[page] && (
        <p className="text-lg font-bold">{classes[page].language} </p>
      )}

      {/* Pasa los IDs de los estudiantes actuales al componente para mostrar la lista de usuarios */}
      <SecondClassUsers currentUsersIds={currentUsersIds} />
    </div>
  );
};
