import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useCreateCabin } from "../cabins/useCreateCabin";
import { useCabins } from "../cabins/useCabins";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const { cabins } = useCabins();

  const numOfDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  //   console.log("numOfDays", numOfDays);

  const queryDate = subDays(new Date(), numOfDays).toISOString();

  const { isLoading, data: recentBookings } = useQuery({
    queryKey: ["Bookings", `last-${numOfDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { recentBookings, isLoading, numOfDays, cabins };
}
