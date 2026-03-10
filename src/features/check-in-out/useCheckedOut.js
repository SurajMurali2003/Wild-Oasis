import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckedOut() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isloading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      toast.success(`Boooking  #${data.id} succslfully cheked-Out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(`Cannot Check OUT ${error}`);
    },
  });

  return { checkout, isloading };
}
