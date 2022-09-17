import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleSchema>;

export { IMotorcycle, MotorcycleSchema };