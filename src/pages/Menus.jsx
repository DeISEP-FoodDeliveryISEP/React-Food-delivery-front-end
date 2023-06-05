import React, { useState } from "react";

import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

// import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pagination.css";

import { categoryListApi, dishListApi, setmealListApi } from "../api/main";

const Menus = () => {
  // const [pageNumber, setPageNumber] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [displayItems, setDisplayItems] = useState([]);

  React.useEffect(() => {
    categoryListApi()
      .then((res) => {
        console.log(res, res.data);
        setCategoryList(res.data);
        setActiveCategory(res.data[0]);
      })
      .catch((err) => {
        alert('request error.');
        console.error(err);
      })
  }, []);

  React.useEffect(() => {
    const catType = activeCategory?.type === 2 ? 2 : 1;
    if (catType === 1) {
      dishListApi({ categoryId: activeCategory.id, status: 1 })
        .then((res) => {
          console.log(res, res.data);
          setDisplayItems(res.data);
        })
        .catch((err) => {
          alert('request error.');
          console.error(err);
        })
    }
    else {
      setmealListApi({ categoryId: activeCategory.id, status: 1 })
        .then((res) => {
          console.log(res, res.data);
          setDisplayItems(res.data);
        })
        .catch((err) => {
          alert('request error.');
          console.error(err);
        })
    }

  }, [activeCategory]);

  return (
    <Helmet title="Menu">
      <Container>
        <Nav pills className="justify-content-between" style={{ marginTop: "1rem" }}>
          {categoryList.map((cat) =>
          (<NavItem key={cat.id}>
            <NavLink className="custom-link" href="#" active={cat.id === activeCategory.id}
              onClick={(event) => {
                event.preventDefault();
                setActiveCategory(cat);
              }}>
              {cat.name}
            </NavLink>
          </NavItem>))
          }
        </Nav>
        <Row>
          <h1 className="mt-3">Our {activeCategory.name} Selections</h1>
        </Row>
        <Row style={{ minHeight: "60vh" }}>

          {displayItems.map((item) => (
            <Col
              lg="3"
              md="4"
              sm="6"
              xs="6"
              key={item.id}
              className="mb-4 mt-4"
            >
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Menus;
