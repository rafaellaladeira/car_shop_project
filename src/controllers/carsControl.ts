import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

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
}