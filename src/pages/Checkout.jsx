import "../styles/checkout.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { Button } from "reactstrap";

const Checkout = () => {
  return (
    <>
      <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <AiFillCheckCircle className="checkoutIcon" />
          <h3>Thank you for your order!</h3>
        </div>
        <span>
          Your order is being processed and will be delivered as fast as
          possible.
        </span>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <Button size="lg" style={{}}>Rate and Review!</Button>
        </div>

      </div>
    </>
  );
};

export default Checkout;
