import React, { useState } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Badge, Card, CardBody, CardTitle, CardFooter, Button } from "reactstrap";
import { removeItemFromCart } from "../store/shopping-cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { formatImageLink, formatPrice } from "../common/utils";
import { getDefaultAddressApi } from "../api/address";
import { addOrderApi } from "../api/order";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [addressData, setAddressData] = useState({});
  const navigate = useNavigate();

  const getDefaultAddress = () => {
    getDefaultAddressApi()
      .then((res) => {
        if (res.code === 1) {
          setAddressData(res.data);
        }
      })
  }

  function goToPaySuccess() {
    const params = {
      remark: "",
      payMethod: 1,
      addressBookId: addressData.id
    }
    addOrderApi(params)
      .then((res) => {
        if (res.code === 1) {
          console.log('success:', res);
          navigate('/checkout');
        }
        else {
          alert('place order failed.');
        }
      })
  }

  React.useEffect(() => {
    getDefaultAddress();
  }, []);
  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <>
                  <h5 className="mb-5">Summary of your order</h5>
                  <table className="table table-borderless mb-5 align-middle">
                    <tbody>
                      {cartItems.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className="mt-4">
                <h6>
                  Subtotal:
                  <span className="cart__subtotal">{formatPrice(totalAmount)}</span>
                </h6>
                {/* <p>Taxes and shipping will calculate at checkout</p> */}
                <div className="mt-4">
                  <h5>Delivery Address</h5>
                  <p>Your default address was chosen as the delivery address. Edit in the personal page.</p>
                  {addressData?.detail ? <Card className="">
                    <CardBody className="d-flex flex-column justify-content-between">
                      <CardTitle tag="h6">
                        {addressData.detail}
                      </CardTitle>
                      <div>
                        <div>Name: {addressData.sex === "0" ? "Ms." : "Mr."} {addressData.consignee}</div>
                        <div>Phone Number: {addressData.phone}</div>
                        {addressData.label !== null ? `Label: ${addressData.label === '公司' ? 'office' : 'home'}` : ""}
                      </div>
                    </CardBody>
                  </Card>
                    : <></>}
                </div>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/pizzas">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn" onClick={() => { goToPaySuccess() }}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image, name, price, quantity, dishFlavor, cartId } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeItemFromCart(cartId));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={formatImageLink(image)} alt="" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{formatPrice(price)}</td>
      {dishFlavor !== undefined ? <td className="text-center">{JSON.parse(dishFlavor).map(value => {
        return (
          <Badge key={value} pill color="light" className="text-dark">
            {value}
          </Badge>
        )
      })}</td> : <></>}
      <td className="text-center">{quantity}px</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
