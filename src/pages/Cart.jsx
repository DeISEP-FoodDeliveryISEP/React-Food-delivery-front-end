import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Badge } from "reactstrap";
import { removeItemFromCart } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import { formatImageLink, formatPrice } from "../common/utils";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
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
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/pizzas">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to="/checkout">Proceed to checkout</Link>
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
