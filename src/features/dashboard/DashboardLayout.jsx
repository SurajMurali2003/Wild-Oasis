import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {
    recentBookings,
    isLoading: isLoading1,
    numOfDays,
    cabins,
  } = useRecentBookings();
  console.log("recentBookings", recentBookings);
  const {
    recentStays,
    isLoading: isLoading2,
    confromedStatys,
  } = useRecentStays();
  console.log("recentStays", recentStays);
  console.log("confromedStatys", confromedStatys);

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        stays={recentStays}
        confromedStatys={confromedStatys}
        numOfDays={numOfDays}
        cabins={cabins}
      />
      <TodayActivity />
      <DurationChart confromedStatys={confromedStatys} />
      <SalesChart bookings={recentBookings} numOfDays={numOfDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
