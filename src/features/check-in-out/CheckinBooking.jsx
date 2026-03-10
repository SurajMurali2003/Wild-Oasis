import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheckedIn } from "./useCheckedIn";
import { constructFrom } from "date-fns";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { isLoading, booking = {}, error } = useBooking();
  const { isLoading: isSettingLoading, settings } = useSettings();
  const [conformPaid, setConformPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { checkIn, isCheckingIn } = useCheckedIn();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setConformPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  function handleCheckin() {
    if (!conformPaid) return;

    {
      !addBreakfast
        ? checkIn({ bookingId, breakfast: {} })
        : checkIn({
            bookingId,
            breakfast: {
              hasBreakfast: true,
              extrasPrice: optionalBreakfastPrice,
              totalPrice: booking?.totalPrice + optionalBreakfastPrice,
            },
          });
    }
  }

  if (isLoading || isSettingLoading) return <Spinner />;

  if (error) {
    alert(error);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((breakfast) => !breakfast);
              setConformPaid(false);
            }}
            id="breafast"
          >
            Want to Add BreakFast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      {booking?.status === "unconfirmed" && (
        <>
          <Checkbox
            checked={conformPaid}
            onChange={() => setConformPaid((conform) => !conform)}
            id={"confirm"}
            disabled={conformPaid || isCheckingIn}
          >
            I conform that {guests.fullName} has paid the total amount (
            {!addBreakfast
              ? formatCurrency(booking?.totalPrice)
              : `${formatCurrency(booking?.totalPrice + optionalBreakfastPrice)}
               ${formatCurrency(booking?.totalPrice)} + ${formatCurrency(optionalBreakfastPrice)}`}
            )
          </Checkbox>
          <ButtonGroup>
            <Button
              type="primary"
              disabled={!conformPaid || isCheckingIn}
              onClick={handleCheckin}
            >
              Check in booking #{bookingId}
            </Button>
            <Button variation="secondary" onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
}

export default CheckinBooking;
