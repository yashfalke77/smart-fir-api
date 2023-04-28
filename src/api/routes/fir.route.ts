import express from "express";
import catchAsync from "../utils/catchAsync";
import { validateFir, validateUpdate } from "../validations/fir.validation";
import { controller } from "../controllers/fir.controller";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/", validateFir, catchAsync(controller.createFir));
router.patch("/:id", catchAsync(controller.updateFir));
router.get("/", catchAsync(controller.getAllFirs));
router.get("/:id", catchAsync(controller.getFirById));

export default router;
