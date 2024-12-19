import mongoose, { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Interfaz para definir la estructura de los documentos en la colección "User".
export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  mainLanguage: string;
  class: mongoose.Types.ObjectId[];
  role: string;
  comparePassword: (password: string) => Promise<Boolean>; // Método para comparar contraseñas.
}

// Esquema de Mongoose para la colección "User".
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  mainLanguage: {
    type: String,
    required: true,
  },
  class: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Class",
    },
  ],
  role: {
    type: String,
    default: "user",
  },
});

// Middleware para encriptar la contraseña antes de guardar un documento.
userSchema.pre<IUser>("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

// Método para comparar una contraseña proporcionada con la encriptada.
userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  const user = this as IUser;
  return await bcrypt.compare(password, user.password);
};

// Exporta el modelo "User" basado en el esquema y la interfaz.
export default model<IUser>("User", userSchema);
