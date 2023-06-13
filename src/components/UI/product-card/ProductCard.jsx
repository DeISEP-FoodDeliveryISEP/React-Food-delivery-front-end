import React, { useState } from "react";

import "../../../styles/product-card.css";

// import productImg from "../../../assets/images/product_2.1.jpg";

import { useDispatch } from "react-redux";
import { cartActions, addToCart } from "../../../store/shopping-cart/cartSlice";
import { formatImageLink, formatPrice } from "../../../common/utils";

import { Link } from "react-router-dom";

import defaultItemImage from "../../../assets/images/defaultItemImage.png";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { setMealDishDetailsApi } from "../../../api/main";

const ProductCard = (props) => {
  const { id, name, image, price, description, flavors, type } = props.item;
  const [modal, setModal] = useState(false);
  // if is setmeal set dishFlavors to blank
  const [dishFlavors, setDishFlavors] = useState(type === 'dish' ? flavors.map(flavor => ({ ...flavor, value: JSON.parse(flavor.value) })) : []);
  const [selectedDishFlavor, setSelectedDishFlavor] = useState(type === 'dish' ? flavors.map(flavor => ({ ...flavor, selectedDishFlavor: JSON.parse(flavor.value)[0] })) : []);
  const [setmealDishes, setSetmealDishes] = useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (type === 'setmeal') {
      setMealDishDetailsApi(id)
        .then((res) => {
          setSetmealDishes(res.data.setmealDishes);
          console.log('setmeal dishes:', res.data);
        });
    }
  }, [type, id]);

  const toggle = () => { setModal(!modal) };
  const addToCartFunc = () => {
    dispatch(
      addToCart({
        id,
        name,
        image,
        price,
        dishFlavor: JSON.stringify(selectedDishFlavor.map((flavor => (`${flavor.name}:${flavor.selectedDishFlavor}`)))),
        type
      })
    );
    toggle();
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between" onClick={toggle}>
      <div className="product__content">
        <img className="product__img" src={formatImageLink(image)} onError={({ currentTarget }) => { currentTarget.src = defaultItemImage }} alt="food" />
        <h5>
          {name}
        </h5>
        <div className="product__description">
          {description}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
          }).format(price / 100)}
        </span>
        {/* <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button> */}
      </div>
      <Modal isOpen={modal} toggle={toggle} centered scrollable fullscreen="sm">
        <ModalHeader toggle={toggle} className="d-block d-sm-none d-flex flex-end border-0"></ModalHeader>
        <ModalBody>
          <img src={formatImageLink(image)} className="img-fluid rounded mb-3" alt={`product-${id}`}></img>
          <h3>{name}</h3>
          {description}
          <div>
            {dishFlavors.map((flavor, flavorIndex) =>
            (<div className="mt-2">
              <h5>Select <span style={{ color: "#971515" }}>{flavor.name}</span></h5>
              <ButtonGroup>
                {flavor.value.map((flavorValue, flavorValueIndex) =>
                  <Button
                    className="me-2 rounded flavor__btn"
                    onClick={() => {
                      setSelectedDishFlavor(selectedDishFlavor.map(
                        (flavor) => ({ ...flavor, selectedDishFlavor: flavorValue })
                      ));
                    }}
                    active={selectedDishFlavor?.[flavorIndex]?.selectedDishFlavor === flavorValue}
                    outline
                    size="sm"
                  >
                    {flavorValue}
                  </Button>)}
              </ButtonGroup>
            </div>)
            )}
            {type === 'setmeal' ?
              <div className="mt-2">
                This set contains the items below:
                {
                  setmealDishes.map((menuItem) => (
                    <div>
                      {menuItem.name}: <span style={{ fontWeight: "bold", color: "#FFD643" }}>{formatPrice(menuItem.price)}</span>
                      {/* <img src={formatImageLink(menuItem.image)} className="w-50 rounded mb-3" alt={`product-${menuItem.id}`}></img> */}
                    </div>
                  ))
                }
                <div className="mt-3">You have saved: <span className="text-success">{formatPrice(setmealDishes.reduce((sum, currentItem) => (sum += currentItem.price), 0) - price)}</span></div>
              </div>
              : ""}
          </div>
          <div>

          </div>
        </ModalBody>
        <ModalFooter className="border-0 d-flex justify-content-between">
          <div className="product__price mb-2">
            {formatPrice(price)}
          </div>
          <>
            {
              <Button className="addTOCART__btn rounded-pill" onClick={addToCartFunc}>Add to Cart</Button>
            }
          </>
        </ModalFooter>
      </Modal>
    </div>

  );
};

export default ProductCard;
