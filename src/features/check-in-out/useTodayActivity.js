import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import { retry } from "@reduxjs/toolkit/query";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["TodayStays"],
  });

  return { activities, isLoading };
}
