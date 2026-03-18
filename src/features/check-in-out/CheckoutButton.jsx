import Button from "../../ui/Button";
import { useCheckedOut } from "./useCheckedOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isloading } = useCheckedOut();

  return (
    <Button
      type="primary"
      sizes="small"
      onClick={() => checkout(bookingId)}
      disabled={isloading}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
