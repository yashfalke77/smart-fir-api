import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';

const statusSchema = Joi.object({
  status: Joi.string().min(10).max(2048).required(),
});

const firSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  phone: Joi.string().min(10).max(10).required(),
  email: Joi.string().min(5).max(255).required(),
  address: Joi.object({
    street: Joi.string().min(5).max(255).required(),
    city: Joi.string().min(5).max(255).required(),
    state: Joi.string().min(3).max(255).required(),
  }),
  pincode: Joi.string().min(6).max(6).required(),
  description: Joi.string().min(10).max(2048).required(),
  policeStation: Joi.string().required(),
  user: Joi.string().required(),
  isEnabled: Joi.boolean().required().default(false),
  status: Joi.array().items(statusSchema),
  investigationOfficer: Joi.string().required().min(3).max(255),
});

const updateFirSchema = Joi.object({
  name: Joi.string().min(3).max(255),
  phone: Joi.string().min(10).max(10),
  email: Joi.string().min(5).max(255),
  address: Joi.object({
    street: Joi.string().min(5).max(255),
    city: Joi.string().min(5).max(255),
    state: Joi.string().min(3).max(255),
  }),
  pincode: Joi.string().min(6).max(6),
  description: Joi.string().min(10).max(2048),
  isEnabled: Joi.boolean(),
  status: Joi.array().items(statusSchema),
  investigationOfficer: Joi.string().min(3).max(255),
});

export const validateFir = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = firSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

export const validateUpdate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = updateFirSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
