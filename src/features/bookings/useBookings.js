import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBokking } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/Constants';

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //Filter
  const filterValue = searchParams.get('status');

  const filter =
    filterValue === null || filterValue === 'all'
      ? { field: 'status', value: null }
      : { field: 'status', value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  //Sort
  const sortByRaw = searchParams.get('SortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  //Pagination
  const page = Number(searchParams.get('page')) || 1;

  //Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['Bookings', filter, sortBy, page],
    queryFn: () => getAllBokking({ filter, sortBy, page }),
  });

  //Pre-Fetching
  const pageCount = count / PAGE_SIZE;
  if (page !== pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['Bookings', filter, sortBy, page + 1],
      queryFn: () => getAllBokking({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['Bookings', filter, sortBy, page - 1],
      queryFn: () => getAllBokking({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
