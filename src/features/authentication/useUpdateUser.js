import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUser({ fullName, avatar, password }),
    onSuccess: (user) => {
      console.log('user', user);
      toast.success('User-Data updated Succesfully');

      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isLoading };
}
