import { RegisterData } from '@/pages/register/forms/RegisterReview';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api';

async function registerUser(data: RegisterData) {
  const resp = await api.post('/users', data);

  return resp.data;
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: registerUser,
  });
}
