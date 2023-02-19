import _ from 'lodash';
import { Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';
import User from '../models/user.model';

export const controller = {
  registerUser: async (req: Request, res: Response) => {},

  loginUser: async (req: Request, res: Response) => {},

  getUserById: async (req: Request, res: Response) => {
    const { params } = req;
    const user = await User.findById(params.id);
    if (!user) throw new ExpressError("User doesn't exists...", 400);
    res.status(200).json({
      data: user,
      meta: {
        message: 'Fetched User Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },
};
