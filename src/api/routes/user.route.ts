import express from "express";
import catchAsync from "../utils/catchAsync";
import { validateUser, loginUser, validateUpdateUser } from "../validations/user.validation";
import { controller } from "../controllers/user.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.get("/:id", catchAsync(controller.getUserById));
router.get("/", catchAsync(controller.getAllUsers));
router.post("/register", validateUser, catchAsync(controller.registerUser));
router.patch("/update", auth, validateUpdateUser, catchAsync(controller.updateUser));
router.post("/login", loginUser, catchAsync(controller.loginUser));
router.delete("/:id", auth, catchAsync(controller.deleteUser));

export default router;
