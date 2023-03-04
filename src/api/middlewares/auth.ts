import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import ExpressError from '../utils/ExpressError';
import config from '../../config/vars';
import AuthRequest from '../interfaces/Request';
import User from '../models/user.model';

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) throw new ExpressError('Access denied...', 401);
  try {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    // req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    throw new ExpressError('Invalid Token', 400);
  }
};

// export const isVerified = async (req:AuthRequest, res:Response, next: NextFunction) => {
//   const { _id: id } = req.user;
//   const user = await User.findById(id);
//   if (!user.emailVerified) throw new ExpressError("User's Email Not Verified");
//   next();
// };

// export const isAuthorOrAdminImage = async (req:AuthRequest, res:Response, next: NextFunction) => {
//   const { id } = req.params;
//   const image = await Image.findById(id);
//   if (!image) throw new ExpressError("Image Doesn't Exists...", 400);
//   if (image.user.equals(req.user._id) || req.user.role === 'admin') next();
//   else throw new ExpressError('Access Denied', 401);
// };

// export const isAuthorOrAdminUser = (req:AuthRequest, res:Response, next: NextFunction) => {
//   const { id } = req.params;
//   if (id === req.user._id || req.user.role === 'admin') next();
//   else throw new ExpressError('Access Denied', 401);
// };
