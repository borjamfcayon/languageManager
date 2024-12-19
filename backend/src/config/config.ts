import dotenv from "dotenv";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export default {
  // Clave secreta usada para firmar y verificar los tokens JWT.
  jwtSecret: process.env.JWT_SECRET || "ConozcoTuSecretoLanguagesApp",

  // Configuración de la base de datos.
  DB: {
    // URI de la base de datos MongoDB.
    // Si no está definida en las variables de entorno, usa una URI local por defecto.
    URI: process.env.MONGODB_URI || "mongodb://localhost/language-app",

    // Usuario para la conexión a la base de datos, tomado de las variables de entorno.
    USER: process.env.MONGODB_USER || "admin",

    // Contraseña para la conexión a la base de datos, tomada de las variables de entorno.
    PASSWORD: process.env.MONGODB_PASSWORD || "admin",
  },
};
