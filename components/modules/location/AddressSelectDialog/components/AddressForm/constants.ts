import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string().min(1, 'Fill the required field'),
  coordinates: z.array(z.number()).length(2, 'Fill the required field')
});

export type AddressSchema = z.infer<typeof addressSchema>;
