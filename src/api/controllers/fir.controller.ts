import _ from 'lodash';
import { Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';
import Fir from '../models/fir.model';

export const controller = {
  createFir: async (req: Request, res: Response) => {
    const { body } = req;
    const fir = await Fir.create(body);
    res.status(200).json({
      data: fir,
      meta: {
        message: 'Created FIR Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  updateFir: async (req: Request, res: Response) => {
    const { body, params } = req;
    const fir = await Fir.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!fir) throw new ExpressError("FIR doesn't exists...", 400);
    res.status(200).json({
      data: fir,
      meta: {
        message: 'Updated FIR Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getAllFirs: async (req: Request, res: Response) => {
    const firs = await Fir.find().populate({ path: 'user' }).populate({ path: 'policeStation' });
    res.status(200).json({
      data: firs,
      meta: {
        message: 'Fetched FIRs Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getFirById: async (req: Request, res: Response) => {
    const { params } = req;
    const fir = await Fir.findById(params.id);
    if (!fir) throw new ExpressError("FIR doesn't exists...", 400);
    res.status(200).json({
      data: fir,
      meta: {
        message: 'Fetched FIR Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },
};
