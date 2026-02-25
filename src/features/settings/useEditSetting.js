import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';
export function useEditSetting() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting Edited Succesfully');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
  });

  return { isLoading, updateSetting };
}
