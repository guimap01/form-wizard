import { api } from '@/api';
import { FormInput } from '@/components/FormInput';
import { FormField } from '@/components/ui/form';
import { User } from '@/types/User';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const personalInformationSchema = z.object({
  firstName: z.string({
    message: 'First name is required',
  }),
  lastName: z.string({
    message: 'Last name is required',
  }),
  email: z
    .string({
      message: 'Email is required',
    })
    .email('Invalid email address')
    .refine(
      async (email) => {
        const resp = await api.get<User>('/users', {
          params: {
            email,
          },
        });
        return !resp.data.id;
      },
      {
        message: 'Email is already in use',
      }
    ),
});

export function PersonalInformation() {
  const form = useFormContext();
  return (
    <div className="space-y-4 text-start">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => <FormInput field={field} label="First name" />}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => <FormInput field={field} label="Last name" />}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => <FormInput field={field} label="Email" />}
      />
    </div>
  );
}
