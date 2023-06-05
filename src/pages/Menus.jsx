import React, { useState } from "react";

import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

// import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pagination.css";

import { categoryListApi, dishListApi } from "../api/main";

const Menus = () => {
  // const [pageNumber, setPageNumber] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [displayItems, setDisplayItems] = useState([]);
  // const searchedProduct = products;

  // const productPerPage = 4;
  // const visitedPage = pageNumber * productPerPage;
  // const displayPage = searchedProduct.slice(
  //   visitedPage,
  //   visitedPage + productPerPage
  // );

  // const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  // const changePage = ({ selected }) => {
  //   setPageNumber(selected);
  // };

  React.useEffect(() => {
    categoryListApi()
      .then((res) => {
        console.log(res, res.data);
        setCategoryList(res.data);
        setActiveCategory(res.data[0].id);
      })
      .catch((err) => {
        alert('request error.');
        console.error(err);
      })
  }, []);

  React.useEffect(() => {
    dishListApi({ categoryId: activeCategory, status: 1 })
      .then((res) => {
        console.log(res, res.data);
        setDisplayItems(res.data);
      })
      .catch((err) => {
        alert('request error.');
        console.error(err);
      })
  }, [activeCategory]);

  return (
    <Helmet title="Menu">
      <Nav pills className="justify-content-between">
        {categoryList.map((cat) =>
        (<NavItem key={cat.id}>
          <NavLink className="custom-link" href="#" active={cat.id === activeCategory}
            onClick={(event) => {
              event.preventDefault();
              setActiveCategory(cat.id);
            }}>
            {cat.name}
          </NavLink>
        </NavItem>))
        }
      </Nav>
      <Container>
        <Row className="justify-content-between">

          {/* {categoryList.map((cat) => (<div key={cat.id}>{cat.name}</div>))} */}
        </Row>
        <Row>
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
