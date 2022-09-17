import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import carsRouter from './routes/carsRouter';
import motorcycleRouter from './routes/motorcycleRouter';

const app = express();
app.use(express.json());
app.use('/cars', carsRouter);
app.use('/motorcycles', motorcycleRouter);
app.use(errorMiddleware);

export default app;
