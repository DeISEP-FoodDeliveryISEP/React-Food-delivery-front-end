import "../styles/checkout.css";
import { Badge, Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Row } from "reactstrap";
import React from "react";
import { addressListApi, setDefaultAddressApi } from "../api/address";
import { orderPagingApi } from "../api/order";

const Personal = () => {
  const userId = localStorage.getItem("userId");
  const [addressBook, setAddressBook] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    getAddresses();
    getOrders();
  }, []);
  const getAddresses = () => {
    addressListApi()
      .then((res) => {
        if (res.code === 1) {
          setAddressBook(res.data);
        }
      })
  }
  const getOrders = () => {
    orderPagingApi({ page: 1, pageSize: 100 })
      .then((res) => {
        if (res.code === 1) {
          setOrders(res.data);
          console.log("orders:", res.data);
        }
      })
  }

  const setAsDefault = (id) => {
    setDefaultAddressApi({ id: id })
      .then((res) => {
        if (res.code === 1) {
          console.log('set success');
          getAddresses();
        }
      })
  }
  return (
    <>
      <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <h3>Welcome to your personal space!</h3>
        </div>
        <span>
          You may check your address book and view your past orders.
        </span>
        <div className="mt-3">
          <h3>Address Book</h3>
          <Button className="mb-2">Add New Address</Button>
          <Row>
            {addressBook.map((addressItem) => (
              <Col xs="12" sm="6" key={addressItem.id}>
                <Card className="h-100">
                  <CardBody className="d-flex flex-column justify-content-between">
                    <CardTitle tag="h5">
                      {addressItem.detail} {addressItem.isDefault ? <Badge color="warning" pill>Default</Badge> : ""}
                    </CardTitle>
                    <div>
                      <div>Name: {addressItem.sex === "0" ? "Ms." : "Mr."} {addressItem.consignee}</div>
                      <div>Phone Number: {addressItem.phone}</div>
                      {addressItem.label !== null ? `Label: ${addressItem.label}` : ""}
                    </div>
                  </CardBody>
                  <CardFooter className="border-0 d-flex justify-content-end">
                    <Button size="sm" className="me-2" color="light" disabled={addressItem.isDefault} onClick={() => { setAsDefault(addressItem.id) }}>Set as Default</Button>
                    <Button size="sm" color="light">Edit</Button>
                  </CardFooter>
                </Card>
              </Col>))}
          </Row>
        </div>
        <div className="mt-3">
          <h3>Past Orders</h3>
        </div>
      </div>
    </>
  );
};

export default Personal;
