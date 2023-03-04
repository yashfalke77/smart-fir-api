import { Request, Response, NextFunction } from 'express';
import { ExpressErrorInterface } from '../interface/expressErrorInterface';

export default (
  err: ExpressErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = err;
  const { statusCode = 500 } = error;
  if (!err.message) error.message = 'Something Went Wrong';
  res
    .status(statusCode)
    .json({
      data: {},
      meta: { message: error.message, flag: false, statusCode },
    });
};
