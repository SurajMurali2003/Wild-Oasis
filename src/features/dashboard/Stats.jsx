import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, cabins, confromedStatys, numOfDays }) {
  // 1.)
  const numOfBookings = bookings?.length;

  //   2.) Total Sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   3.)
  const checkIns = confromedStatys?.length;

  //   4.)
  const cabinsCount = cabins?.length;

  const occupation =
    confromedStatys?.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numOfDays && cabinsCount) || numOfDays * cabinsCount;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOfBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
