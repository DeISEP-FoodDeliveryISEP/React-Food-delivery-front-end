import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";

import { Link, useNavigate } from "react-router-dom";

import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";
import { loginApi, sendMsgApi } from "../api/login.js";
import Footer from "../components/Footer/Footer.jsx";

const Login = () => {
  const [sentSMS, setSentSMS] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();
  const verifyPhone = () => {
    sendMsgApi({ phone: phoneNumber })
      .then((res) => {
        if (res.code === 1) {
          setSentSMS(true);
        }
      })
  }
  const login = () => {
    loginApi({ phone: phoneNumber, code: code })
      .then((res) => {
        if (res.code === 1) {
          sessionStorage.setItem("userPhone", phoneNumber);
          localStorage.setItem("userId", res?.data?.id);
          navigate("/");
        }
      })
  }
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Easy order & fast delivery</h5>
                <h1 className="mb-4 hero__title">
                  <span>TastyTreats:</span> your favorite food
                  at your fingertips!
                </h1>
                <h4>Login to Continue</h4>

                <div className="my-3">
                  <Label for="phone-number">Phone Number:</Label>
                  <Input
                    id="phone-number"
                    bsSize="sm"
                    type="tel"
                    style={{ width: "20rem" }}
                    placeholder="+33"
                    value={phoneNumber}
                    onChange={(event) => { setPhoneNumber(event.target.value); }}
                    disabled={sentSMS}
                  />
                  <Button className="login__btn mt-2" size="sm" disabled={sentSMS} onClick={() => { verifyPhone() }}>
                    {sentSMS ? "Code Sent" : "Send Code"}
                  </Button>
                  {
                    !sentSMS ? <></>
                      :
                      <div className="mt-2">
                        <Label for="verification-code">Verification Code:</Label>
                        <Input
                          id="verification-code"
                          bsSize="sm"
                          type="number"
                          style={{ width: "20rem" }}
                          value={code}
                          onChange={(event) => { setCode(event.target.value); }}
                          placeholder="Enter the four-digit code"
                        />
                        <Button className="login__btn mt-2" onClick={() => { login() }}>Verify</Button>
                      </div>
                  }
                </div>

                {/* <button className="order__btn d-flex align-items-center justify-content-between ">
                  <Link to="/menu">
                    Menu <i className="ri-arrow-right-s-line"></i>
                  </Link>
                </button> */}
              </div>
            </Col>

            <Col lg="6" md="6" className="d-flex align-items-center">
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer></Footer>
    </Helmet>
  );
};

export default Login;
