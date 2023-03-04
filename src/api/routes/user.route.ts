import express from 'express';
import catchAsync from '../utils/catchAsync';
import { validateUser } from '../validations/user.validation';
import { controller } from '../controllers/user.controller';

const router = express.Router();

router.post(
  '/auth/register',
  validateUser,
  catchAsync(controller.registerUser),
);
router.post('/auth/login', catchAsync(controller.loginUser));
router.get('/:id', catchAsync(controller.getUserById));
router.post("/", validateUser, catchAsync(controller.registerUser));
router.post("/", validateUser, catchAsync(controller.loginUser));

export default router;
