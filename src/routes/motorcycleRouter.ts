import { Router } from 'express';
import MotorModel from '../models/motorcycleModel';
import MotorService from '../services/motorcycleService';
import MotorControl from '../controllers/motorcycleControl';

const motorcycleRouter = Router();

const motorcycleModel = new MotorModel();
const motorcycleService = new MotorService(motorcycleModel);
const motorcycleControl = new MotorControl(motorcycleService);

motorcycleRouter.post('/', (req, res) => motorcycleControl.create(req, res));

export default motorcycleRouter;