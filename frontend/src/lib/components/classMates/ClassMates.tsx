import React from "react";
import { useGetUserInfo } from "../../api/UserApi";
import { Loading } from "../Loading";
import { Button } from "@mui/material";
import { ClassUsers } from "./ClassUsers";

// Componente para mostrar los compañeros de clase
export const ClassMates = () => {
  // Estado local para manejar la página actual en la paginación
  const [page, setPage] = React.useState(0);

  // Obtiene la información del usuario actual, incluyendo los datos de la clase
  const { data: userInfo, isLoading } = useGetUserInfo();

  // Si los datos del usuario están cargando, muestra un indicador de carga
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-12 overflow-y-auto overflow-x-hidden">
      <h6 className="text-2xl font-bold">Compañeros de clase </h6>

      {/* Muestra los usuarios de la clase correspondiente */}
      <ClassUsers page={page} userInfo={userInfo} />

      {/* Muestra los botones de navegación solo si el usuario tiene más de un compañero de clase */}
      {userInfo?.class && userInfo.class.length > 1 && (
        <div className="flex gap-2">
          {/* Botón para ir a la página anterior, deshabilitado si ya está en la primera página */}
          <Button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
          >
            Anterior
          </Button>
          {/* Botón para ir a la siguiente página, deshabilitado si ya está en la última página */}
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === userInfo?.class.length - 1}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
};
