import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarsModel from '../../../models/carsModel';
import { 
    carMock,
    carMockWithId,
    carMockForChange,
    carMockAfterChangeWithId,
    allCarsMock,
 } from '../mocks/carsMock';

describe('Car model', () => {
    const carsModel = new CarsModel();

  before(async () => {
    sinon.stub()(Model, 'create').resolves(carMockWithId);
    sinon.stub()(Model, 'find').resolves(allCarsMock);
    sinon.stub()(Model, 'findOne').resolves(carMockWithId);
    sinon.stub()(Model, 'findByIdAndUpdate').resolves(carMockAfterChangeWithId);
    sinon.stub()(Model, 'findByIdAndRemove').resolves(carMockAfterChangeWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car',() => {
      it('successfully created', async () => {
        const newCar = await carsModel.create(carMock);
        expect(newCar).to.be.deep.equal(carMockWithId);
      });
  })

  describe('searching all cars',() => {
    it('successfully found all cars', async () => {
      const allCars = await carsModel.read();
      expect(allCars).to.be.deep.equal(allCarsMock);
    });
})

describe('searching a car by Id',() => {
    it('successfully found one car', async () => {
      const findOneCar = await carsModel.readOne('4edd40c86762e0fb12000003');
      expect(findOneCar).to.be.deep.equal(carMockWithId);
    });
})

describe('update a car',() => {
    it('successfully updated', async () => {
      const updated = await carsModel.update('4edd40c86762e0fb12000003', carMockForChange);
      expect(updated).to.be.deep.equal(carMockAfterChangeWithId);
    });
})

describe('delete a car',() => {
    it('successfully deleted', async () => {
      const deleted = await carsModel.delete('4edd40c86762e0fb12000003');
      expect(deleted).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
        try {
            await carsModel.delete('4edd40c86762e0fb120ERRADO')
        } catch (error: any) {
            expect(error.message).to.be.eq('EntityNotFound')
        }
    })
})

});