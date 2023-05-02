import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';

const statusSchema = Joi.object({
  status: Joi.string().min(10).max(2048).required(),
});

const firSchema = Joi.object({
  subject: Joi.string().min(10).max(998),
  description: Joi.string().min(10).max(2048),
  policeStation: Joi.string(),
  user: Joi.string(),
  isEnabled: Joi.boolean().default(false),
  status: Joi.array().items(statusSchema),
  investigationOfficer: Joi.string().min(3).max(255),
  transactionHash : Joi.string(),
  FIRnumber: Joi.number(),
  evidenceUrl: Joi.url().max(2048)
});

const updateFirSchema = Joi.object({
  subject: Joi.string().min(10).max(998),
  description: Joi.string().min(10).max(2048),
  isEnabled: Joi.boolean(),
  status: Joi.array().items(statusSchema),
  investigationOfficer: Joi.string().min(3).max(255),
  transactionHash : Joi.string(),
  FIRnumber: Joi.number(),
  evidenceUrl: Joi.url().max(2048)
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
