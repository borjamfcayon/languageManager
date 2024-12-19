// Importación de dependencias
import express from "express"; // Framework para crear el servidor web
import passport from "passport"; // Middleware para autenticación
import passportMiddleware from "./middlewares/passport"; // Estrategia de autenticación personalizada
import cors from "cors"; // Middleware para manejar CORS (Cross-Origin Resource Sharing)
import morgan from "morgan"; // Middleware para registrar las solicitudes HTTP

import authRoutes from "./routes/auth.routes"; // Rutas relacionadas con la autenticación
import specialRoutes from "./routes/special.routes"; // Rutas adicionales para funcionalidades especiales

// Creación de la aplicación Express
const app = express();

// Configuración del puerto
// Se establece el puerto que usará la aplicación, con un valor por defecto de 3000
app.set("port", process.env.PORT || 3000);

// Middlewares
// Morgan para registrar las solicitudes HTTP en modo "dev" (información básica de la solicitud)
app.use(morgan("dev"));
// CORS para permitir que la API sea accesible desde otros dominios
app.use(cors());
// Middleware para analizar datos en formato URL-encoded, útil para formularios HTML
app.use(express.urlencoded({ extended: false }));
// Middleware para analizar datos JSON en el cuerpo de la solicitud
app.use(express.json());
// Inicialización de Passport para la autenticación
app.use(passport.initialize());
// Uso de la estrategia de autenticación personalizada definida en passportMiddleware
passport.use(passportMiddleware);

// Ruta raíz de la API
// Responde con un mensaje que incluye la URL donde está corriendo la API
app.get("/", (req, res) => {
  return res.send(`The API is at http://localhost:${app.get("port")}`);
});

// Uso de rutas personalizadas
// Se usan las rutas de autenticación y las rutas especiales definidas en los archivos correspondientes
app.use(authRoutes); // Rutas para la autenticación (login, registro, etc.)
app.use(specialRoutes); // Rutas para funcionalidades especiales

// Exportación de la aplicación para poder iniciar el servidor en otro archivo
export default app;
