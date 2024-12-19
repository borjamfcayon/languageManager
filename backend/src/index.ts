// Importación de la aplicación Express configurada
import app from "./app"; // Importa la instancia de la aplicación Express desde el archivo "app.js"

// Importación de la configuración de la base de datos
import "./database"; // Ejecuta la conexión a la base de datos al importar este archivo

// Inicia el servidor en el puerto configurado
app.listen(app.get("port")); // La aplicación escucha en el puerto especificado en la configuración (usando `app.set("port", ...)`)

// Muestra en consola un mensaje indicando que el servidor está corriendo
console.log(`Listening on http://localhost:${app.get("port")}`); // Imprime la URL y el puerto donde la API está accesible
