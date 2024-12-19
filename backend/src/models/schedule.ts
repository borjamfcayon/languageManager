import { model, Schema, Document } from "mongoose";

// Interfaz para definir la estructura de los documentos en la colección "Schedule".
export interface ISchedule extends Document {
  day: string;
  hours: number[];
}

// Esquema de Mongoose para la colección "Schedule".
const scheduleSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  hours: [
    {
      type: Number,
      required: true,
    },
  ],
});

// Exportamos el modelo "Schedule" basado en el esquema y la interfaz.
export default model<ISchedule>("Schedule", scheduleSchema);
