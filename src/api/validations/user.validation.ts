import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/ExpressError";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  firs: Joi.array().items(Joi.string().required()),
  email: Joi.string().min(5).max(255).required(),
  gender: Joi.string().valid("male", "female", "other"),
  phone: Joi.string().min(11).max(11).required(),
  address: Joi.object({
    street: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(5).max(255).required(),
    state: Joi.string().min(3).max(255).required(),
  }),
  pincode: Joi.string().min(6).max(6).required(),
  dob: Joi.date().required(),
  password: Joi.string().min(8).max(1024).required(),
  role: Joi.string()
    .valid("user", "admin", "authority")
    .required()
    .default("user"),
  isActive: Joi.boolean().default(true),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required().email().min(5).max(255),
  password: Joi.string().required().min(8).max(1024),
});

export const loginUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
