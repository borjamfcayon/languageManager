import React, { Dispatch, SetStateAction } from "react"; 
import { Select, MenuItem, Button } from "@mui/material";
import { ISchedule, useCreateSchedule } from "../../api/ScheduleApi"; 
import { IClassResponse, useUpdateClass } from "../../api/ClassApi";
import { useQueryClient } from "react-query"; 

// Componente para añadir un horario a una clase
export const AddScheduleForm = ({
  setView,
  classData,
}: {
  setView: Dispatch<SetStateAction<boolean>>;
  classData: IClassResponse;
}) => {
  // Estado local para almacenar los datos del nuevo horario
  const [schedule, setSchedule] = React.useState<ISchedule>({
    day: "",
    hours: [],
  });

  // Cliente de consulta de React Query para gestionar la caché
  const queryClient = useQueryClient();

  // Hook para crear un nuevo horario
  const { mutate: createSchedule } = useCreateSchedule();
  // Hook para actualizar los datos de una clase
  const { mutate: updateClass } = useUpdateClass();

  // Función para manejar el proceso de añadir un horario
  const handleAddSchedule = () => {
    // Llamar al hook createSchedule para crear un nuevo horario
    createSchedule(schedule, {
      onSuccess: (response: IClassResponse) => {
        // Actualizar los horarios de la clase con el nuevo horario creado
        const updatedSchedules = Array.isArray(classData.schedules)
          ? [...classData.schedules, response._id]
          : [response._id];

        // Crear un nuevo objeto con los datos de la clase actualizados
        const newClassData: IClassResponse = {
          _id: classData._id,
          imgUrl: classData.imgUrl,
          language: classData.language,
          teacher: classData.teacher,
          students: classData.students,
          schedules: updatedSchedules, // Incluir los horarios actualizados
        };

        // Llamar al hook updateClass para actualizar los datos de la clase con el nuevo horario
        updateClass(newClassData, {
          onSuccess: () => {
            // Resetear las consultas relacionadas con la clase y los horarios para forzar la actualización en la caché
            queryClient.resetQueries("class");
            queryClient.resetQueries("schedules");
            // Cerrar el formulario
            setView(false);
          },
          onError: (error) => {
            console.error("Error updating class:", error); // Manejo de errores durante la actualización de la clase
          },
        });
      },

      onError: (error) => {
        console.error("Error creating schedule:", error); // Manejo de errores durante la creación del horario
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {" "}
      {/* Contenedor principal del formulario */}
      {/* Selector para elegir el día de la semana */}
      <Select
        value={schedule.day} // Valor actual del día seleccionado
        onChange={(e) => setSchedule({ ...schedule, day: e.target.value })} // Actualizar el estado con el nuevo día
        displayEmpty
      >
        {/* Opciones de días de la semana */}
        <MenuItem value="" disabled>
          Selecciona un día
        </MenuItem>
        <MenuItem value="monday">Lunes</MenuItem>
        <MenuItem value="tuesday">Martes</MenuItem>
        <MenuItem value="wednesday">Miércoles</MenuItem>
        <MenuItem value="thursday">Jueves</MenuItem>
        <MenuItem value="friday">Viernes</MenuItem>
      </Select>
      {/* Selector para elegir la hora del horario */}
      <Select
        value={schedule.hours} // Valor actual de las horas seleccionadas
        onChange={(e) =>
          setSchedule({ ...schedule, hours: e.target.value as number[] })
        } // Actualizar el estado con las nuevas horas
        displayEmpty
      >
        {/* Opciones de horas para seleccionar */}
        <MenuItem value="" disabled>
          Selecciona una hora
        </MenuItem>
        <MenuItem value={8}>8:00 AM</MenuItem>
        <MenuItem value={10}>10:00 AM</MenuItem>
        <MenuItem value={12}>12:00 PM</MenuItem>
        <MenuItem value={14}>2:00 PM</MenuItem>
        <MenuItem value={16}>4:00 PM</MenuItem>
        <MenuItem value={18}>6:00 PM</MenuItem>
        <MenuItem value={20}>8:00 PM</MenuItem>
      </Select>
      {/* Contenedor de los botones de acción */}
      <div className="w-full flex flex-row gap-2 mt-2">
        {/* Botón para cancelar y cerrar el formulario */}
        <Button
          variant="contained"
          color="inherit"
          onClick={() => setView(false)}
        >
          Cancelar
        </Button>
        {/* Botón para añadir el horario */}
        <Button variant="contained" color="primary" onClick={handleAddSchedule}>
          Añadir
        </Button>
      </div>
    </div>
  );
};
