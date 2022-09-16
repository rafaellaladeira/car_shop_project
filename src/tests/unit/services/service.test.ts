import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ErrorTypes } from '../../../errors/error';
import CarsModel from '../../../models/carsModel';
import CarsService from '../../../services/carsService';
import { 
    carMock,
    carMockWithId,
    carMockForChange,
    carMockAfterChangeWithId,
    allCarsMock,
 } from '../mocks/carsMock';
import { ZodError } from 'zod';

describe('Car Service', () => {

    const carsModel = new CarsModel();
    const carsService = new CarsService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(carMockWithId);
    sinon.stub(carsModel, 'read').resolves(allCarsMock);
    sinon.stub(carsModel, 'readOne').resolves(carMockWithId);
    sinon.stub(carsModel, 'update').resolves(carMockAfterChangeWithId);
    sinon.stub(carsModel, 'delete').resolves(carMockAfterChangeWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('create a new car', ()=> {
      it('success', async () => {
          const newCar = await carsService.create(carMock);
          expect(newCar).to.be.deep.equal(carMockWithId);
      });

      it('fail ', async () => {
          try {
            await carsService.create({} as any);
          } catch (error) {
            expect(error).to.be.instanceOf(ZodError);
          }
      });
  });

  describe('search all the cars', ()=> {
    it('success', async () => {
        const allCars = await carsService.read();
        expect(allCars).to.be.deep.equal(allCarsMock);
    });

    it('fail ', async () => {
        try {
            await carsService.read();
        } catch (error) {
            expect(error).to.be.deep.equal([]);
        }
    });
})

describe('search one car', ()=> {
    it('success', async () => {
        const getOneCar = await carsService.readOne('4edd40c86762e0fb12000003');
        expect(getOneCar).to.be.deep.equal(carMockWithId);
    });

    it('fail', async () => {
        try {
            await carsService.readOne('4edd40c86762e0fb120ERRADO')
        } catch (error: any) {
            expect(error.message).to.be.eq('EntityNotFound')
        }
});

})

describe('update a car', ()=> {
    it('successfully updated', async () => {
        const updated = await carsService.update('4edd40c86762e0fb12000003', carMockForChange);
        expect(updated).to.be.deep.equal(carMockAfterChangeWithId);

        it('fail', async () => {
            try {
                await carsService.update('4edd40c86762e0fb120ERRADO', carMockForChange)
            } catch (error: any) {
                expect(error.message).to.be.eq('EntityNotFound')
            }
    });

});
})

describe('delete a car', ()=> {
    it('successfully deleted', async () => {
        const deleted = await carsService.delete('4edd40c86762e0fb12000003');
        expect(deleted).to.be.deep.equal(carMockAfterChangeWithId);
        });

        it('_id not found', async () => {
            try {
                await carsService.delete('4edd40c86762e0fb120ERRADO')
            } catch (error: any) {
                expect(error.message).to.be.eq('EntityNotFound')
            }
    });
})
})
