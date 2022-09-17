import { Router } from 'express';
import MotorModel from '../models/motorcycleModel';
import MotorService from '../services/motorcycleService';
import MotorControl from '../controllers/motorcycleControl';

const motorcycleRouter = Router();

const motorcycleModel = new MotorModel();
const motorcycleService = new MotorService(motorcycleModel);
const motorcycleControl = new MotorControl(motorcycleService);

motorcycleRouter.post('/', (req, res) => motorcycleControl.create(req, res));
motorcycleRouter.get('/', (req, res) => motorcycleControl.read(req, res));
motorcycleRouter.get('/:id', (req, res) => motorcycleControl.readOne(req, res));
// motorcycleRouter.put('/:id', (req, res) => motorcycleControl.update(req, res));
// motorcycleRouter.delete('/:id', (req, res) => motorcycleControl.delete(req, res));

export default motorcycleRouter;