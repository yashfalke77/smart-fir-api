import express, { Request, Response } from 'express';
import firRoute from './fir.route';
import policeStationRoute from './policeStation.route';
import userRoute from './user.route';

const router = express.Router();

router.get('/status', (req: Request, res: Response) => {
  res.status(200).json({
    data: {},
    meta: {
      message: 'Complaint all you want !!!',
      flag: true,
      statusCode: 200,
    },
  });
});

router.use('/fir', firRoute);
router.use('/station', policeStationRoute);
router.use('/user', userRoute);

export default router;
