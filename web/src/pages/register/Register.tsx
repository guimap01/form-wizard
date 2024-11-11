import {
  MultiStepFormWizard,
  FormStep,
} from '@/components/MultiStepFormWizard';
import {
  DeliveryPreferences,
  deliveryPreferencesSchema,
} from '@/pages/register/forms/DeliveryPreferences';
import {
  PersonalInformation,
  personalInformationSchema,
} from '@/pages/register/forms/PersonalInformation';
import {
  RegisterData,
  RegisterReview,
  registerSchema,
} from '@/pages/register/forms/RegisterReview';
import { useToast } from '@/hooks/use-toast';
import { defineStepper } from '@stepperize/react';
import { isAxiosError } from 'axios';
import { useRegisterUser } from './hooks/useRegister';
import { useLocalStorageModal } from '@/hooks/useLocalStorageModal';

const localStorageKey = 'register';

export function Register() {
  const { toast } = useToast();
  const stepper = useStepper();
  const { isPending, mutateAsync } = useRegisterUser();
  const { data, localStorageModal, resetData } =
    useLocalStorageModal<RegisterData>(localStorageKey);

  async function onSubmit(data: RegisterData) {
    try {
      await mutateAsync(data, {
        onSuccess: () => {
          toast({
            title: 'Registration successful',
            description: 'You have successfully registered',
          });
          stepper.reset();
          resetData();
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            toast({
              title: 'Something went wrong while saving your data',
              description: error.message,
            });
          }
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: 'Something went wrong while saving your data',
          description: error.message,
        });
      }
    }
  }
  return (
    <>
      <MultiStepFormWizard
        key={data?.firstName}
        onSubmit={onSubmit}
        title="Register"
        stepper={stepper}
        isLoading={isPending}
        localStorageKey={localStorageKey}
        defaultValues={data}
      />
      {localStorageModal}
    </>
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
