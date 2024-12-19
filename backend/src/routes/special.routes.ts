import { Router } from "express";
import passport from "passport";
import * as userController from "../controllers/user.controller"; // Controladores relacionados con usuarios.
import * as classController from "../controllers/class.controller"; // Controladores relacionados con clases.
import * as scheduleController from "../controllers/schedule.controller"; // Controladores relacionados con horarios.

// Crea una instancia del router de Express.
const router = Router();

//#region User Routes
/**
 * Rutas relacionadas con los usuarios.
 */

// Ruta para obtener todos los usuarios.
// Método: GET
// Endpoint: /users
// Requiere autenticación JWT.
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

// Ruta para obtener un usuario por su ID.
// Método: GET
// Endpoint: /users/:id
// Requiere autenticación JWT.
router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUserById
);

// Ruta para obtener la información del usuario autenticado.
// Método: GET
// Endpoint: /usersInfo
// Requiere autenticación JWT.
router.get(
  "/usersInfo",
  passport.authenticate("jwt", { session: false }),
  userController.getMyUserInfo
);

// Ruta para obtener los usuarios asociados a una clase específica.
// Método: GET
// Endpoint: /usersInfo/:classId
// Requiere autenticación JWT.
router.get(
  "/usersInfo/:classId",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsersOfAClass
);

// Ruta para obtener múltiples usuarios por sus IDs.
// Método: POST
// Endpoint: /usersByIds
// Requiere autenticación JWT.
router.post(
  "/usersByIds",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsersByIds
);

// Ruta para actualizar un usuario.
// Método: PUT
// Endpoint: /users/:id
// Requiere autenticación JWT.
router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

// Ruta para eliminar un usuario.
// Método: DELETE
// Endpoint: /users/:id
// Requiere autenticación JWT.
router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

// Ruta para obtener el rol del usuario autenticado.
// Método: GET
// Endpoint: /role
// Requiere autenticación JWT.
router.get(
  "/role",
  passport.authenticate("jwt", { session: false }),
  userController.getRole
);

// Ruta para obtener usuarios por su rol.
// Método: GET
// Endpoint: /role/:role
// Requiere autenticación JWT.
router.get(
  "/role/:role",
  passport.authenticate("jwt", { session: false }),
  userController.getUserByRole
);
//#endregion

//#region Class Routes
/**
 * Rutas relacionadas con las clases.
 */

// Ruta para obtener todas las clases.
// Método: GET
// Endpoint: /classes
// Requiere autenticación JWT.
router.get(
  "/classes",
  passport.authenticate("jwt", { session: false }),
  classController.getAllClasses
);

// Ruta para obtener una clase por su ID.
// Método: GET
// Endpoint: /classes/:id
// Requiere autenticación JWT.
router.get(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.getClassById
);

// Ruta para obtener clases por sus IDs.
// Método: POST
// Endpoint: /classesByIds
// Requiere autenticación JWT.
router.post(
  "/classesByIds",
  passport.authenticate("jwt", { session: false }),
  classController.getClassesByIds
);

// Ruta para crear una nueva clase.
// Método: POST
// Endpoint: /classes
// Requiere autenticación JWT.
router.post(
  "/classes",
  passport.authenticate("jwt", { session: false }),
  classController.createClass
);

// Ruta para actualizar una clase.
// Método: PUT
// Endpoint: /classes/:id
// Requiere autenticación JWT.
router.put(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.updateClass
);

// Ruta para eliminar una clase.
// Método: DELETE
// Endpoint: /classes/:id
// Requiere autenticación JWT.
router.delete(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.deleteClass
);

// Ruta para obtener las próximas clases basadas en horarios.
// Método: POST
// Endpoint: /classesNext
// Requiere autenticación JWT.
router.post(
  "/classesNext",
  passport.authenticate("jwt", { session: false }),
  classController.getNextClasses
);
//#endregion

//#region Schedule Routes
/**
 * Rutas relacionadas con los horarios.
 */

// Ruta para obtener todos los horarios.
// Método: GET
// Endpoint: /schedules
// Requiere autenticación JWT.
router.get(
  "/schedules",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getAllSchedules
);

// Ruta para obtener un horario por su ID.
// Método: GET
// Endpoint: /schedules/:id
// Requiere autenticación JWT.
router.get(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getScheduleById
);

// Ruta para obtener horarios por sus IDs.
// Método: POST
// Endpoint: /schedules/ids
// Requiere autenticación JWT.
router.post(
  "/schedules/ids",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getScheduleByIds
);

// Ruta para crear un nuevo horario.
// Método: POST
// Endpoint: /schedules
// Requiere autenticación JWT.
router.post(
  "/schedules",
  passport.authenticate("jwt", { session: false }),
  scheduleController.createSchedule
);

// Ruta para actualizar un horario.
// Método: PUT
// Endpoint: /schedules/:id
// Requiere autenticación JWT.
router.put(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.updateSchedule
);

// Ruta para eliminar un horario.
// Método: DELETE
// Endpoint: /schedules/:id
// Requiere autenticación JWT.
router.delete(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.deleteSchedule
);
//#endregion

// Exporta las rutas para ser utilizadas en la aplicación principal.
export default router;
