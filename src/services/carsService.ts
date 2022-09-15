import { IService } from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/error';

class CarsService implements IService<ICar> {
  private _cars: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._cars.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const result = await this._cars.read();
    if (result === null) return [];
    return result;
  }

  public async readOne(_id: string): Promise<ICar> {
    const result = await this._cars.readOne(_id);   
    if (!result) throw new Error(ErrorTypes.EntityNotFound);
    return result;
  }
}
export default CarsService;