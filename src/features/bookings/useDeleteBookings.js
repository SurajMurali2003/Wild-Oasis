import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking } from '../../services/apiBookings';

export function useDeleteBookings() {
  const queryClient = useQueryClient();
  const { mutate: deleteEachBooking, isloading } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: (data) => {
      console.log(data);

      toast.success(`${data?.id} Succesfully deleted`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(`Cannot Delete Booking${error}`);
    },
  });
  return { deleteEachBooking, isloading };
}
