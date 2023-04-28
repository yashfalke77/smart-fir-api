import { Response, NextFunction } from 'express';
import AuthRequest from '../interfaces/Request';
import ExpressError from '../utils/ExpressError';

const admin = (req:AuthRequest, res:Response, next:NextFunction) => {
  console.log(req.user);
  if (req.user.role === 'user') throw new ExpressError('Access denied', 401);
  next();
};

export default admin;
