import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { ZodObject } from 'zod';

export function FormComponent({
  children,
  schema,
  defaultValues,
}: {
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodObject<any, any, any>;
  defaultValues?: Record<string, unknown>;
}) {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        {children} <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export async function fillPersonalForm() {
  await userEvent.type(
    screen.getByRole('textbox', {
      name: /first name/i,
    }),
    'test first name'
  );
  await userEvent.type(
    screen.getByRole('textbox', {
      name: /last name/i,
    }),
    'test last name'
  );
  await userEvent.type(
    screen.getByRole('textbox', {
      name: /email/i,
    }),
    'email@gmail.com'
  );
}
export async function fillDeliveryPreferencesForm() {
  await userEvent.type(
    screen.getByRole('textbox', {
      name: /delivery address/i,
    }),
    'test location 123'
  );

  await userEvent.click(
    screen.getByRole('radio', {
      name: /morning/i,
    })
  );
}
export async function assessPersonalInformationFields() {
  await waitFor(() => {
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });
}
export async function assessDeliveryPreferencesFields() {
  await waitFor(() => {
    expect(
      screen.getByRole('textbox', {
        name: /Delivery address/i,
      })
    );
    expect(screen.getByText(/preferred time/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /special instructions/i,
      })
    ).toBeInTheDocument();
  });
}

export function QueryClientWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
