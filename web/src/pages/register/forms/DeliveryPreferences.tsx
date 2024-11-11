import { FormInput } from '@/components/FormInput';
import { FormRadioGroup, Option } from '@/components/FormRadioGroup';
import { FormField } from '@/components/ui/form';
import { preferredTimeValues } from '@/utils/constants';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

const preferredTimeOptions: Option[] = [
  {
    label: 'Morning',
    value: 'morning',
  },
  {
    label: 'Afternoon',
    value: 'afternoon',
  },
  {
    label: 'Evening',
    value: 'evening',
  },
];

export const deliveryPreferencesSchema = z.object({
  deliveryAddress: z.string({
    message: 'Delivery address is required',
  }),
  preferredTime: z.enum(preferredTimeValues, {
    required_error: 'Select a preferred time',
  }),
  specialInstructions: z.string().optional(),
});

export function DeliveryPreferences() {
  const form = useFormContext();
  return (
    <div className="space-y-4 text-start">
      <FormField
        control={form.control}
        name="deliveryAddress"
        render={({ field }) => (
          <FormInput field={field} label="Delivery address" />
        )}
      />
      <FormField
        control={form.control}
        name="preferredTime"
        render={({ field }) => (
          <FormRadioGroup
            field={field}
            label="Preferred Time"
            options={preferredTimeOptions}
          />
        )}
      />
      <FormField
        control={form.control}
        name="specialInstructions"
        render={({ field }) => (
          <FormInput field={field} label="Special instructions" />
        )}
      />
    </div>
  );
}
