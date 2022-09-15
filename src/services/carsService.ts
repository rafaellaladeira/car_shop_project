import { IService } from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

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
}

export default CarsService;