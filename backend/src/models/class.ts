import mongoose, { Schema, Document } from "mongoose";

// Interfaz para definir la estructura de los documentos en la colección "Class".
export interface IClass extends Document {
  language: string;
  teacher: mongoose.Types.ObjectId;
  imgUrl: string;
  students: mongoose.Types.ObjectId[];
  schedules: mongoose.Types.ObjectId[];
}

// Esquema de Mongoose para la colección "Class".
const ClassSchema: Schema = new Schema({
  language: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  imgUrl: { type: String, required: true },
  students: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  schedules: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
});

// Exportamos el modelo "Class" basado en el esquema y la interfaz.
export default mongoose.model<IClass>("Class", ClassSchema);
