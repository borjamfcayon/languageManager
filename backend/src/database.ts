// Importación de dependencias
import mongoose, { ConnectOptions } from "mongoose"; // mongoose para interactuar con MongoDB
import config from "./config/config"; // Importa la configuración de la base de datos desde un archivo de configuración

// Configuración de las opciones de conexión a la base de datos
const dbOptions: ConnectOptions = {
  user: config.DB.USER, // Usuario de la base de datos, configurado en el archivo de configuración
  pass: config.DB.PASSWORD, // Contraseña de la base de datos, configurado en el archivo de configuración
};

// Conexión a la base de datos MongoDB
mongoose.connect(config.DB.URI, dbOptions); // Conecta a MongoDB usando la URI y las opciones definidas

// Obtenemos el objeto de conexión
const connection = mongoose.connection;

// Evento que se dispara cuando la conexión a MongoDB se establece correctamente
connection.once("open", () => {
  console.log("Mongodb Connection established"); // Mensaje de éxito cuando la conexión es exitosa
});

// Evento que se dispara si ocurre un error al intentar conectarse a MongoDB
connection.on("error", (err) => {
  console.log("Mongodb connection error:", err); // Mensaje de error en caso de fallar la conexión
  process.exit(); // Termina el proceso si la conexión a la base de datos falla
});
