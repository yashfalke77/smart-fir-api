import { Request, Response, NextFunction } from 'express';

export default function catchAsync(func: any) {
  return (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next);
}
