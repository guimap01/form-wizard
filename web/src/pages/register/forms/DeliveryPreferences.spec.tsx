import { FormComponent } from '@/utils/testUtils';
import { render, screen, waitFor } from '@testing-library/react';
import {
  DeliveryPreferences,
  deliveryPreferencesSchema,
} from './DeliveryPreferences';
import userEvent from '@testing-library/user-event';

describe('DeliveryPreferences', () => {
  function renderComponent({
    defaultValues,
  }: {
    defaultValues?: Record<string, unknown>;
  } = {}) {
    render(
      <FormComponent
        schema={deliveryPreferencesSchema}
        defaultValues={defaultValues}
      >
        <DeliveryPreferences />
      </FormComponent>
    );
  }
  it('should validate Delivery preferences fields correctly', async () => {
    renderComponent();

    await userEvent.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    );

    await waitFor(() => {
      expect(screen.getByText('Delivery address is required'));
      expect(screen.getByText('Select a preferred time'));
    });
  });
  it('should be able to fill fields with default values', async () => {
    const defaultValues = {
      deliveryAddress: 'test location',
      preferredTime: 'morning',
    };
    renderComponent({ defaultValues });

    await waitFor(() => {
      expect(
        screen.getByRole('textbox', {
          name: /Delivery address/i,
        })
      ).toHaveValue(defaultValues.deliveryAddress);
      expect(
        screen.getByRole('radio', {
          name: /morning/i,
        })
      ).toBeChecked();
    });
  });
});
