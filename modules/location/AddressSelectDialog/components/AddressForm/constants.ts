import { z } from 'zod';

import { isPointInPolygon } from '@/modules/location/helpers';
import { MAP } from '@/utils/constants';

export const addressSchema = z.object({
  name: z.string().min(1, 'Fill the required field'),
  is_default: z.boolean(),
  apartment: z.string().max(50),
  intercom: z.string().max(50),
  entrance: z.string().max(20),
  floor: z.string().max(20),
  courier_comment: z.string().max(500),
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
