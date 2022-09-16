import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';
import { ErrorTypes } from '../errors/error';

export default class CarsControl {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const data = { model, year, color, buyValue, doorsQty, seatsQty }; 
    const result = await this._service.create(data);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[]>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const result = await this._service.readOne(id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const data: ICar = req.body;

    if (id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    if (Object.keys(data).length === 0) {
      return res.status(400).end();
    } 
    const result = await this._service.update(id, data);
    return res.status(200).json(result);
  }
}