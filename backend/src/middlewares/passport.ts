// Importamos el modelo de usuario desde "../models/user".
import User from "../models/user";

// Importamos las clases y funciones necesarias de "passport-jwt".
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

// Importamos la configuración del archivo "../config/config".
import config from "../config/config";

// Configuración de opciones para la estrategia JWT.
const opts: StrategyOptions = {
  // Extraemos el token JWT desde el encabezado "Authorization" en formato Bearer.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Llave secreta para validar el token JWT.
  secretOrKey: config.jwtSecret,
};

// Exportamos una nueva instancia de la estrategia JWT.
export default new Strategy(
  opts,
  // Función asíncrona que actúa como callback para manejar la autenticación.
  async (payload, done) => {
    try {
      // Buscamos al usuario en la base de datos usando el ID contenido en el payload del JWT.
      const user = await User.findById(payload.id);

      // Si el usuario existe, se pasa al controlador siguiente.
      if (user) {
        return done(null, user);
      }

      // Si el usuario no se encuentra, devolvemos `false` para indicar autenticación fallida.
      return done(null, false);
    } catch (error) {
      // Capturamos cualquier error y lo registramos en la consola.
      console.log(error);
    }
  }
);
