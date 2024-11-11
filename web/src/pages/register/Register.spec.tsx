import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Register } from './Register';
import {
  assessDeliveryPreferencesFields,
  assessPersonalInformationFields,
  fillDeliveryPreferencesForm,
  fillPersonalForm,
} from '@/utils/testUtils';

describe('Register', () => {
  it('should render the Register component', async () => {
    render(<Register />);

    await assessPersonalInformationFields();
  });
  it('should be able to fill the Personal form and go to next step', async () => {
    render(<Register />);

    await fillPersonalForm();

    await userEvent.click(
      screen.getByRole('button', {
        name: /next/i,
      })
    );
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
  });
  it('should be able to return to Personal form from Delivery preferences form', async () => {
    render(<Register />);

    await fillPersonalForm();

    await userEvent.click(
      screen.getByRole('button', {
        name: /next/i,
      })
    );
    await assessDeliveryPreferencesFields();

    await userEvent.click(
      screen.getByRole('button', {
        name: /back/i,
      })
    );

    await assessPersonalInformationFields();
  });
  it('should be able to fill Delivery preferences form and go to final step with all fields from previous steps filled', async () => {
    render(<Register />);

    await fillPersonalForm();

    await userEvent.click(
      screen.getByRole('button', {
        name: /next/i,
      })
    );
    await assessDeliveryPreferencesFields();
    await fillDeliveryPreferencesForm();

    await userEvent.click(
      screen.getByRole('button', {
        name: /next/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByRole('button', {
          name: /back/i,
        })
      ).not.toBeInTheDocument();
    });
    await assessPersonalInformationFields();
    await assessDeliveryPreferencesFields();

    await waitFor(() => {
      // assess for values in the review step
      expect(
        screen.getByRole('textbox', {
          name: /first name/i,
        })
      ).toHaveValue('test first name');
      expect(
        screen.getByRole('textbox', {
          name: /last name/i,
        })
      ).toHaveValue('test last name');
      expect(
        screen.getByRole('textbox', {
          name: /email/i,
        })
      ).toHaveValue('email@gmail.com');
      expect(screen.getByRole('radio', { name: /morning/i })).toBeChecked();

      expect(
        screen.getByRole('textbox', {
          name: /delivery address/i,
        })
      ).toHaveValue('test location 123');
    });
  });
});
