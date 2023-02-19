import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';

const policeStationSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  pincode: Joi.string().min(6).max(6).required(),
  area: Joi.string().min(3).max(255).required(),
  inchargeName: Joi.string().min(3).max(255).required(),
});

export const validatePoliceStation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = policeStationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
