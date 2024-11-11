import { z } from 'zod';
import {
  DeliveryPreferences,
  deliveryPreferencesSchema,
} from './DeliveryPreferences';
import {
  PersonalInformation,
  personalInformationSchema,
} from './PersonalInformation';

export const registerSchema = personalInformationSchema.merge(
  deliveryPreferencesSchema
);

export type RegisterData = z.infer<typeof registerSchema>;

export function RegisterReview() {
  return (
    <>
      <PersonalInformation />
      <DeliveryPreferences />
    </>
  );
}
