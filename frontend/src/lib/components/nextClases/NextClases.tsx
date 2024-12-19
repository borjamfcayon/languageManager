import { useGetUserInfo } from "../../api/UserApi";
import { Loading } from "../Loading";
import { Classes } from "./Classes";

// Componente que muestra las próximas clases del usuario
export const NextClases = () => {
  // Llama al hook useGetUserInfo para obtener la información del usuario (incluyendo las clases a las que está inscrito)
  const { data, isLoading, error } = useGetUserInfo();

  // Muestra un componente de carga mientras los datos del usuario se están obteniendo
  if (isLoading) return <Loading />;

  // Si ocurre un error al obtener los datos del usuario, se muestra un mensaje de error
  if (error) {
    return <p>Error: {error.toString()}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 gap-2">
      {/* Título de la sección */}
      <h6 className="text-2xl font-bold">Próximas Clases</h6>
      {/* Pasa las clases del usuario al componente Classes */}
      <Classes classes={data?.class || []} />
    </div>
  );
};
