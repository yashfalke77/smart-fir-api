import express from 'express';
import catchAsync from '../utils/catchAsync';
import { validatePoliceStation } from '../validations/policeStation.validation';
import { controller } from '../controllers/policeStation.controller';

const router = express.Router();

router.post('/', validatePoliceStation, catchAsync(controller.createStation));
router.get('/', catchAsync(controller.getAllStations));
router.get('/:id', catchAsync(controller.getStationById));

export default router;
