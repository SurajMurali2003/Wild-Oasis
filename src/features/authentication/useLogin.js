import { useMutation } from '@tanstack/react-query';
import { login as apiLogin } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),

    onSuccess: (user) => {
      console.log(user);

      navigate('/dashboard');
      toast.success('Login Succefuly');
    },
    onError: (err) => {
      console.log(err);

      toast.error('Invaid Email or Pasword');
    },
  });

  return { login, isLoading };
}
