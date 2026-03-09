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
 const [conformPaid, setConformPaid] = useState(false);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  
  useEffect(() => {
    setConformPaid(booking?.isPaid || false);
  }, [booking?.isPaid])
  function handleCheckin() { }
  
  if (isLoading) return <Spinner />
   if (error) {
    alert(error)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {booking?.status === "unconfirmed" && (
      <>
          <Checkbox disabled={conformPaid}
            checked={conformPaid}
            onChange={() => setConformPaid(conform => !conform)}
            id={"confirm"}
        
          >I conform that {guests.fullName} has paid the total amount </Checkbox>
        <ButtonGroup>
        <Button type="primary" disabled={!conformPaid}  onClick={handleCheckin}>Check in booking #{bookingId}</Button>
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
