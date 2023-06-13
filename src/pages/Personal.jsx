import "../styles/checkout.css";
import { Button } from "reactstrap";

const Personal = () => {
  return (
    <>
      <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <h3>Welcome to your personal space!</h3>
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

export default Personal;
