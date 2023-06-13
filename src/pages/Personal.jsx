import "../styles/checkout.css";
import { Badge, Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, Input, ModalBody, Row } from "reactstrap";
import React from "react";
import { addressListApi, setDefaultAddressApi } from "../api/address";
import { orderPagingApi } from "../api/order";
import { formatPrice } from "../common/utils";
import { Modal } from "reactstrap";

const Personal = () => {
  const userId = localStorage.getItem("userId");
  const [addressBook, setAddressBook] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const toggle = () => { setModal(!modal) };
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
          setOrders(res.data.records);
          console.log("orders:", res.data.records);
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
                      {addressItem.label !== null ? `Label: ${addressItem.label === '公司' ? 'office' : 'home'}` : ""}
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
          <Row>
            {orders.map((orderItem) => (
              <Col xs="12" sm="6" key={orderItem.id}>
                <Card className="h-100">
                  <CardBody className="d-flex flex-column justify-content-between">
                    <CardTitle tag="h5">
                      Order Number: {orderItem.number}
                    </CardTitle>
                    <div>
                      <div>Name: {orderItem.consignee}</div>
                      <div>Time: {orderItem.orderTime}</div>
                      <div>Order Details: </div>
                      {orderItem.orderDetail.map((dishes) => {
                        return (<div>{dishes.name} <Badge color="warning">{JSON.parse(dishes.dishFlavor).join(',')}</Badge></div>)
                      })}
                      <div>Total Price: {formatPrice(orderItem.amount * 100)}</div>
                      {/* <div>Phone Number: {addressItem.phone}</div> */}
                      {/* {addressItem.label !== null ? `Label: ${addressItem.label === '公司' ? 'office' : 'home'}` : ""} */}
                    </div>
                  </CardBody>
                  <CardFooter className="border-0 d-flex justify-content-end">
                    {/* <Button size="sm" className="me-2" color="light" disabled={addressItem.isDefault} onClick={() => { setAsDefault(addressItem.id) }}>Set as Default</Button> */}
                    <Button size="sm" color="light" onClick={() => { toggle(); }}>Rate</Button>
                  </CardFooter>
                </Card>
              </Col>))}
          </Row>
        </div>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalBody>
            Rate: <Input></Input>
            Comment: <Input></Input>
            <Button className="mt-2">Submit</Button>
          </ModalBody>
        </Modal>
      </div >
    </>
  );
};

export default Personal;
