/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from '@stepperize/react';
import { useForm } from 'react-hook-form';
import { Form } from './ui/form';
import React, { ReactNode, useState } from 'react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { ZodObject } from 'zod';
import { deleteItem, setItem } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

export interface FormStep {
  id: any;
  label: string;
  schema: ZodObject<any, any, any>;
  element: ReactNode;
}

export function MultiStepFormWizard({
  onSubmit,
  title,
  stepper,
  isLoading,
  localStorageKey,
  defaultValues,
}: {
  onSubmit: (data: any) => Promise<void>;
  title: string;
  stepper: Stepper<FormStep[]>;
  isLoading?: boolean;
  localStorageKey?: string;
  defaultValues?: any;
}) {
  const [formState, setFormState] = useState(defaultValues || {});
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(stepper.current.schema),
    defaultValues: formState,
  });

  const { toast } = useToast();

  async function handleSubmit(data: any) {
    try {
      const formData = {
        ...formState,
        ...data,
      };
      if (stepper.isLast) {
        await onSubmit(formData);

        if (localStorageKey) {
          deleteItem(localStorageKey);
        }
        setFormState({});
        form.reset();
      } else {
        setFormState(formData);
        if (localStorageKey) {
          setItem(localStorageKey, JSON.stringify(formData));
        }
        stepper.next();
      }
    } catch (error: any) {
      toast({
        title: 'Something went wrong while saving your data',
        description:
          'message' in error
            ? error.message
            : 'Please try again in a few seconds',
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-6 border rounded-lg w-[750px]"
      >
        <h2 className="text-lg font-medium">{title}</h2>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol
            className="flex items-center justify-between gap-2"
            aria-orientation="horizontal"
          >
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full ${
                      index <= stepper.current.index
                        ? 'bg-black text-white'
                        : 'bg-gray-400 text-black'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </li>
                {index < array.length - 1 && (
                  <Separator
                    className={`flex-1 ${
                      index < stepper.current.index ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {stepper.all.map((step) =>
            stepper.when(step.id, () => (
              <React.Fragment key={step.id}>{step.element}</React.Fragment>
            ))
          )}
          <div className="flex justify-end gap-4">
            {!stepper.isLast && (
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
            )}
            <Button type="submit" isLoading={isLoading}>
              {stepper.isLast ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
