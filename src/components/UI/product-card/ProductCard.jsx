import React from "react";

import "../../../styles/product-card.css";

// import productImg from "../../../assets/images/product_2.1.jpg";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { formatImageLink } from "../../../common/utils";

import { Link } from "react-router-dom";

import defaultItemImage from "../../../assets/images/defaultItemImage.png";

const ProductCard = (props) => {
  const { id, name, image, price } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        name,
        image,
        price
      })
    );
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between">
      <div className="product__content">
        <img className="product__img img-fluid" src={formatImageLink(image)} onError={({ currentTarget }) => { currentTarget.src = defaultItemImage }} alt="food" />
        <h5>
          <Link to={`/pizzas/${id}`}>{name}</Link>
        </h5>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(price / 100)}
        </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
