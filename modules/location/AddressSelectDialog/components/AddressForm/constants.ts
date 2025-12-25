import { z } from 'zod';

import { isPointInPolygon } from '@/modules/location';
import { MAP } from '@/utils/constants';

export const addressSchema = z.object({
  name: z.string().min(1, 'Fill the required field'),
  address: z
    .object(
      {
        location_name: z.string(),
        latitude: z.number(),
        longitude: z.number()
      },
      { required_error: 'Fill the required field' }
    )
    .refine(
      ({ latitude, longitude }) => isPointInPolygon([longitude, latitude], MAP.availablePolygon),
      {
        message: 'Location is outside the available area'
      }
    )
});

export type AddressSchema = z.infer<typeof addressSchema>;
