import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleSchema = new Schema<IMotorcycle>(
  {
    category: String,
    engineCapacity: Number,
  },
  { versionKey: false },
);

class Motorcycle extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}

export default Motorcycle;