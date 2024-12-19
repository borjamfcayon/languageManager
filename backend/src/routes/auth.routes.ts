import { Router } from "express"; // Importa el router de Express.
import {
  signIn, // Controlador para iniciar sesión.
  signUp, // Controlador para registrar un nuevo usuario.
  verifyToken, // Controlador para verificar la validez de un token.
} from "../controllers/auth.controller"; // Importa los controladores relacionados con autenticación.

// Crea una instancia de Router.
const router = Router();

// Ruta para registrar un nuevo usuario.
// Método: POST
// Endpoint: /register
// Controlador: signUp
router.post("/register", signUp);

// Ruta para iniciar sesión.
// Método: POST
// Endpoint: /login
// Controlador: signIn
router.post("/login", signIn);

// Ruta para verificar la validez de un token.
// Método: POST
// Endpoint: /verify
// Controlador: verifyToken
router.post("/verify", verifyToken);

// Exporta las rutas para ser utilizadas en la aplicación principal.
export default router;
