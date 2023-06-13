import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";

import { Link } from "react-router-dom";

import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";

const Login = () => {
  const [sentSMS, setSentSMS] = React.useState(false);
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Easy order & fast delivery</h5>
                <h1 className="mb-4 hero__title">
                  <span>Enjoy</span> your favorite food <br />
                  At your fingertips!
                </h1>
                <h4>Login to Continue</h4>
                {!sentSMS ?
                  <div className="my-3">
                    <Label for="phone-number">Phone Number:</Label>
                    <Input
                      id="phone-number"
                      bsSize="sm"
                      type="tel"
                      style={{ width: "20rem" }}
                      placeholder="+33"
                    />
                    <Button className="login__btn mt-2">Verify</Button>
                  </div>
                  :
                  "sent"}
                {/* <button className="order__btn d-flex align-items-center justify-content-between ">
                  <Link to="/menu">
                    Menu <i className="ri-arrow-right-s-line"></i>
                  </Link>
                </button> */}
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
