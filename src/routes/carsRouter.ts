import { Router } from 'express';
import CarsControl from '../controllers/carsControl';
import CarsService from '../services/carsService';
import CarsModel from '../models/carsModel';

const carsRouter = Router();

const cars = new CarsModel();
const carsService = new CarsService(cars);
const carsControl = new CarsControl(carsService);

carsRouter.post('/', (req, res) => carsControl.create(req, res));
carsRouter.get('/', (req, res) => carsControl.read(req, res));
carsRouter.get('/:id', (req, res) => carsControl.readOne(req, res));
carsRouter.put('/:id', (req, res) => carsControl.update(req, res));
carsRouter.delete('/:id', (req, res) => carsControl.delete(req, res));

export default carsRouter;