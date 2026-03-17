import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numofDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numofDays).toISOString();

  const { isLoading, data: recentStays } = useQuery({
    queryKey: ["Stays", `stays-${numofDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confromedStatys = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { isLoading, recentStays, confromedStatys };
}
