import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const Motorcycle = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().lte(2500),
});

type IMotorcycle = z.infer<typeof Motorcycle>;

export { IMotorcycle, Motorcycle };