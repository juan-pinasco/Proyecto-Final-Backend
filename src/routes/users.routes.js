import { Router } from "express";
const router = Router();

import * as usersController from "../controllers/users.controller.js";

router.get("/", usersController.getUsers);
router.get("/:uid", usersController.getUserById);
router.put("/:uid", usersController.updateUserById);
router.delete("/:uid", usersController.deleteUserById);

export default router;
