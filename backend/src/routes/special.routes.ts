import { Router } from "express";
import passport from "passport";
import * as userController from "../controllers/user.controller";
import * as classController from "../controllers/class.controller";
import * as scheduleController from "../controllers/schedule.controller";

const router = Router();

//#region User Routes
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUserById
);

router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteUser
);

router.get(
  "/role",
  passport.authenticate("jwt", { session: false }),
  userController.getRole
);

router.get(
  "/role/:role",
  passport.authenticate("jwt", { session: false }),
  userController.getUserByRole
);
///#endregion

//#region Class Routes
router.get(
  "/classes",
  passport.authenticate("jwt", { session: false }),
  classController.getAllClasses
);

router.get(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.getClassById
);

router.post(
  "/classes",
  passport.authenticate("jwt", { session: false }),
  classController.createClass
);

router.put(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.updateClass
);

router.delete(
  "/classes/:id",
  passport.authenticate("jwt", { session: false }),
  classController.deleteClass
);

//#endregion

//#region Schedule Routes
router.get(
  "/schedules",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getAllSchedules
);

router.get(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.getScheduleById
);

router.post(
  "/schedules",
  passport.authenticate("jwt", { session: false }),
  scheduleController.createSchedule
);

router.put(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.updateSchedule
);

router.delete(
  "/schedules/:id",
  passport.authenticate("jwt", { session: false }),
  scheduleController.deleteSchedule
);

//#endregion

export default router;
