import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { ErrorTypes } from '../errors/error';

export default class MotorcycleControl {
  constructor(private _service: IService<IMotorcycle>) {}

  public async create(req: Request, res: Response<IMotorcycle>) {
    const { model, year, color, buyValue, category, engineCapacity } = req.body;
    const data = { model, year, color, buyValue, category, engineCapacity };
    const result = await this._service.create(data);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const { id } = req.params;
    const data: IMotorcycle = req.body;

    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    if (Object.keys(data).length === 0) {
      return res.status(400).end();
    } 
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }
}