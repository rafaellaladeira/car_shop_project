import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/error';

class MotorcycleService implements IService<IMotorcycle> {
  private _motor: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._motor = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motor.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    const result = await this._motor.read();
    if (result === null) return [];
    return result;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const result = await this._motor.readOne(_id);   
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const result = await this._motor.update(_id, obj);
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const data = await this._motor.delete(_id);
    if (!data) throw new Error(ErrorTypes.EntityNotFound);
    return data;
  }
}

export default MotorcycleService;