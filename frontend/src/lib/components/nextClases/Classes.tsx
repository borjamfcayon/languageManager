import { useGetNextClasses } from "../../api/ClassApi";
import { Loading } from "../Loading";

// Interfaz que define la estructura de un objeto de clase
interface NextClass {
  name: string; // Nombre de la clase
  imgUrl: string; // URL de la imagen asociada con la clase
  day: string; // Día de la semana en que se realiza la clase
  hour: number; // Hora de la clase en formato de 24 horas
}

// Array que mapea los días de la semana en inglés a su traducción en español
const days = [
  { day: "monday", name: "Lunes" },
  { day: "tuesday", name: "Martes" },
  { day: "wednesday", name: "Miércoles" },
  { day: "thursday", name: "Jueves" },
  { day: "friday", name: "Viernes" },
  { day: "saturday", name: "Sábado" },
  { day: "sunday", name: "Domingo" },
];

// Componente que muestra las próximas clases de una lista de clases pasadas como prop
export const Classes = ({ classes }: { classes: string[] }) => {
  // Llama al hook useGetNextClasses con las clases recibidas y maneja el estado de carga y error
  const { data, isLoading, error } = useGetNextClasses(classes);

  // Muestra un componente de carga mientras los datos están siendo obtenidos
  if (isLoading) return <Loading />;

  // Muestra un mensaje de error si ocurre un problema al obtener las clases
  if (error) {
    return <p>Error: {error.toString()}</p>;
  }

  return (
    <div className="grid grid-cols-4">
      {/* Usa una cuadrícula con 4 columnas para mostrar las clases */}
      {Array.isArray(data) && // Verifica que los datos obtenidos sean un array
        data?.map(
          // Mapea las clases obtenidas
          (
            c: NextClass,
            i: number // Para cada clase, renderiza su información
          ) =>
            i < 4 && ( // Solo muestra las primeras 4 clases
              <div
                key={i} // Asigna una clave única para cada clase
                className="flex flex-col justify-center items-center p-4 gap-1"
              >
                <img
                  className="rounded aspect-video filter" // Estilo de imagen (redondeada y aspecto 16:9)
                  src={c.imgUrl} // URL de la imagen de la clase
                  alt={c.name} // Texto alternativo con el nombre de la clase
                />
                <p>{days.find((d) => d.day === c.day)?.name}</p>{" "}
                {/* Muestra el día de la clase en español */}
                <p>{`Hora: ${c.hour}:00`}</p>{" "}
                {/* Muestra la hora de la clase */}
              </div>
            )
        )}
    </div>
  );
};
