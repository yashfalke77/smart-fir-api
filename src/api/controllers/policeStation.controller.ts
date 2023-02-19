import _ from 'lodash';
import { Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';
import PoliceStation from '../models/policeStation.model';

export const controller = {
  createStation: async (req: Request, res: Response) => {
    const { body } = req;
    const station = await PoliceStation.create(body);
    res.status(200).json({
      data: station,
      meta: {
        message: 'Created Police Station Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getAllStations: async (req: Request, res: Response) => {
    const stations = await PoliceStation.find();
    res.status(200).json({
      data: stations,
      meta: {
        message: 'Fetched Police Stations Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },

  getStationById: async (req: Request, res: Response) => {
    const { params } = req;
    const station = await PoliceStation.findById(params.id);
    if (!station) {
      throw new ExpressError("Police Station doesn't exists...", 400);
    }
    res.status(200).json({
      data: station,
      meta: {
        message: 'Fetched Police Station Successfully...',
        flag: 'SUCCESS',
        statusCode: 200,
      },
    });
  },
};
