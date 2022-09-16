import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import { ErrorTypes } from '../../../errors/error';
import CarsModel from '../../../models/carsModel';
import CarsService from '../../../services/carsService';
import CarsControl from '../../../controllers/carsControl';
import { 
    carMock,
    carMockWithId,
    carMockForChange,
    carMockAfterChangeWithId,
    allCarsMock,
 } from '../mocks/carsMock';

describe('Car control', () => {

const carsModel = new CarsModel();
const carsService = new CarsService(carsModel);
const carsControl = new CarsControl(carsService);

const req = {} as Request; 
const res = {} as Response;

  before(async () => {
    sinon.stub(carsService, 'create').resolves(carMockWithId);
    sinon.stub(carsService, 'read').resolves(allCarsMock);
    sinon.stub(carsService, 'readOne').resolves(carMockWithId);
    sinon.stub(carsService, 'update').resolves(carMockAfterChangeWithId);
    sinon.stub(carsService, 'delete').resolves(carMockAfterChangeWithId);
  });

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

  after(()=>{
    sinon.restore();
  })

  describe('create a new car', ()=> {
      it('sucess', async () => {
        req.body = carMock;
        await carsControl.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
      });
  })

  describe('search all cars', ()=> {
    it('sucess', async () => {
      await carsControl.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(allCarsMock)).to.be.true;
    });
})

describe('search car by id', ()=> {
    it('sucess', async () => {
      req.params = { id: carMockWithId._id };
      await carsControl.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

    it('fail', async () => {
        req.params = { id: '4edd40c8762e0fb120ERRADO' };
        
        try {
            await carsControl.readOne(req, res);
        } catch (error: any) {
            expect(error.message).to.be.eq('InvalidMongoId')
        }
      });
})

describe('update a car', ()=> {
    it('sucess', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carMockForChange;
      await carsControl.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockAfterChangeWithId)).to.be.true;
    });

    it('fail', async () => {
        req.params = { id: '4edd40c8762e0fb120ERRADO' };
        req.body = carMockForChange;
        try {
            await carsControl.update(req, res);
        } catch (error: any) {
            expect(error.message).to.be.eq('InvalidMongoId')
        }
      });
})

// describe('delete a car', ()=> {
//     it('sucess', async () => {
//       req.params = { id: carMockWithId._id };
//       await carsControl.delete(req, res);

//       expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
//     });

//     it('fail', async () => {
//         req.params = { id: '4edd40c8762e0fb1g20ERRADO' };
        
//         try {
//             await carsControl.delete(req, res);
//         } catch (error: any) {
//             expect(error.message).to.be.eq('InvalidMongoId')
//         }
//       });
// })

});