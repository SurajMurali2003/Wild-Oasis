import { useQuery } from "@tanstack/react-query";
import { getAllBokking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export default function useBookings() {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");

  const filter =
    filterValue === null || filterValue === "all"
      ? { field: "status", value: null }
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //Sort
  const sortByRaw = searchParams.get("SortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["Bookings", filter, sortBy, page],
    queryFn: () => getAllBokking({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
}
