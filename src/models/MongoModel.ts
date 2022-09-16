import { Model, UpdateQuery } from 'mongoose';

abstract class MongoModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async update(_id: string, data: Partial<T>): Promise<T | null> {
    const result = await this._model.findByIdAndUpdate(
      { _id },
      { ...data } as UpdateQuery<T>,
      { new: true },
    );    
    return result;
  }
}

export default MongoModel;