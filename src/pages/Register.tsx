import {
  MultiStepFormWizard,
  FormStep,
} from '@/components/MultiStepFormWizard';
import {
  DeliveryPreferences,
  deliveryPreferencesSchema,
} from '@/forms/DeliveryPreferences';
import {
  PersonalInformation,
  personalInformationSchema,
} from '@/forms/PersonalInformation';
import {
  RegisterData,
  RegisterReview,
  registerSchema,
} from '@/forms/RegisterReview';
import { useToast } from '@/hooks/use-toast';
import { defineStepper } from '@stepperize/react';
import { isAxiosError } from 'axios';
import { useState } from 'react';

export function Register() {
  const { toast } = useToast();
  const stepper = useStepper();
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(data: RegisterData) {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      toast({
        title: 'Registration successful',
        description: 'You have successfully registered',
      });
      stepper.reset();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast({
          title: 'Something went wrong while saving your data',
          description: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <MultiStepFormWizard
      onSubmit={onSubmit}
      title="Register"
      stepper={stepper}
      isLoading={isLoading}
    />
  );
}

const { useStepper } = defineStepper<FormStep[]>(
  {
    id: 'personalInformation',
    label: 'Personal',
    schema: personalInformationSchema,
    element: <PersonalInformation />,
  },
  {
    id: 'deliveryPreferences',
    label: 'Delivery preferences',
    schema: deliveryPreferencesSchema,
    element: <DeliveryPreferences />,
  },
  {
    id: 'registerReview',
    label: 'Review and submit',
    schema: registerSchema,
    element: <RegisterReview />,
  }
);
