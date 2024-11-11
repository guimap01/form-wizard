import { FormComponent } from '@/utils/testUtils';
import { render, screen, waitFor } from '@testing-library/react';
import {
  PersonalInformation,
  personalInformationSchema,
} from './PersonalInformation';
import userEvent from '@testing-library/user-event';

jest.mock('@/api', () => ({
  api: {
    get: jest.fn().mockResolvedValue({ data: { id: 1 } }),
  },
}));

describe('PersonalInformation', () => {
  function renderComponent({
    defaultValues,
  }: {
    defaultValues?: Record<string, unknown>;
  } = {}) {
    render(
      <FormComponent
        schema={personalInformationSchema}
        defaultValues={defaultValues}
      >
        <PersonalInformation />
      </FormComponent>
    );
  }
  it('should validate Personal fields correctly', async () => {
    renderComponent();

    await userEvent.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    );
    await waitFor(() => {
      expect(screen.getByText('First name is required'));
      expect(screen.getByText('Last name is required'));
      expect(screen.getByText('Email is required'));
    });
  });
  it('should validate email input', async () => {
    renderComponent();

    await userEvent.type(
      screen.getByRole('textbox', {
        name: /first name/i,
      }),
      'test'
    );
    await userEvent.type(
      screen.getByRole('textbox', {
        name: /last name/i,
      }),
      'last name'
    );
    await userEvent.type(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      'email'
    );

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });
  it('should be able to fill fields with default values', async () => {
    const defaultValues = {
      firstName: 'test first name',
      lastName: 'test last name',
      email: 'email@gmail.com',
    };
    renderComponent({ defaultValues });

    await waitFor(() => {
      expect(
        screen.getByRole('textbox', {
          name: /first name/i,
        })
      ).toHaveValue(defaultValues.firstName);
      expect(
        screen.getByRole('textbox', {
          name: /last name/i,
        })
      ).toHaveValue(defaultValues.lastName);
      expect(
        screen.getByRole('textbox', {
          name: /email/i,
        })
      ).toHaveValue(defaultValues.email);
    });
  });
  it('should validate email input with existing email', async () => {
    renderComponent();

    await userEvent.type(
      screen.getByRole('textbox', {
        name: /email/i,
      }),
      'email@gmail.com'
    );

    await waitFor(() => {
      expect(screen.getByText(/email is already in use/i)).toBeInTheDocument();
    });
  });
});
