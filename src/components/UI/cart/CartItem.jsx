import React from "react";
import { ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import { cartActions, addToCart, removeItemFromCart, decItemFromCart } from "../../../store/shopping-cart/cartSlice";

import defaultItemImage from "../../../assets/images/defaultItemImage.png";
import {
  formatImageLink, formatPrice
} from "../../../common/utils";
const CartItem = ({ item, onClose }) => {
  console.log('cart:', item);
  const { id, name, price, image, quantity, dishFlavor, cartId } = item;
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const incrementItem = (event) => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
        dishFlavor
      })
    );
    event.stopPropagation();
  };

  const decreaseItem = (event) => {
    dispatch(decItemFromCart(cartId));
    event.stopPropagation();
  };

  const deleteItem = (event) => {
    dispatch(removeItemFromCart(cartId));
    event.stopPropagation();
  };


  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-4">
        <img src={formatImageLink(image)} onError={({ currentTarget }) => { currentTarget.src = defaultItemImage }} alt="food" />


        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{name}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price mb-0">
              {quantity}x <span>{formatPrice(price)}</span>
            </p>
            <div className="d-flex flex-column small mb-1">
              {
                dishFlavor !== undefined && (
                  JSON.parse(dishFlavor).map(value => {
                    return (
                      <span key={value} className="">
                        {value}
                      </span>
                    )
                  })
                )
              }
            </div>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={event => incrementItem(event)}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={event => decreaseItem(event)}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={event => deleteItem(event)}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
