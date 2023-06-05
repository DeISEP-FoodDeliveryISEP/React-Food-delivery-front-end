import React, { useState } from "react";

import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import Helmet from "../components/Helmet/Helmet";
import "../styles/pagination.css";

import { categoryListApi } from "../api/main";

const Menus = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const searchedProduct = products;

  const productPerPage = 4;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
          {displayPage.map((item) => (
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
          {/* <div className="d-flex justify-content-center mt-4 mb-4">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              containerClassName="paginationBttns"
            />
          </div> */}
        </Row>
      </Container>
    </Helmet>
  );
};

export default Menus;
