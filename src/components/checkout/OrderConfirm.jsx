import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import CartContext from "./../../context/CartContext";
import CustomerContext from "./../../context/CustomerContext";
import DeliveryContext from "./../../context/DeliveryContext";
import ShopContext from "./../../context/ShopContext";
import { IconContext } from "react-icons";
import { BsCheckCircleFill } from "react-icons/bs";
import PaymentContext from "./../../context/PaymentContext";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import EndScreen from "./EndScreen";

function OrderConfirm({ confirm, setConfirm, total }) {
  const apiDA = configData.apiUrl + "/customerOrder";
  const storeId = useContext(ShopContext);
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const { cart, setCart } = useContext(CartContext);
  const { customerInfo, setCustomerInfo } = useContext(CustomerContext);
  const { payment, setPayment } = useContext(PaymentContext);
  const [end, setEnd] = useState(false);

  const handleClose = () => {
    setConfirm(false);
  };

  const handleConfirm = () => {
    let customerOrder = {
      shopId: "NULL",
      customerInfo: "NULL",
      deliveryMethod: "NULL",
      orderMethod: "NULL",
      schedule: "NULL",
      items: "NULL",
      paymentMethod: "NULL",
      totalPrice: "NULL",
      status: "NULL",
    };
    customerOrder.shopId = parseInt(storeId);
    customerOrder.customerInfo = JSON.stringify(customerInfo);
    customerOrder.deliveryMethod = deliveryInfo.deliveryMode;
    customerOrder.orderMethod = deliveryInfo.orderMode;
    if (deliveryInfo.schedule) {
      customerOrder.schedule = JSON.stringify(deliveryInfo.schedule);
    }
    customerOrder.items = JSON.stringify(cart);
    let pay = "";
    if (payment == 1) {
      pay = "cash";
    }
    customerOrder.paymentMethod = pay;
    customerOrder.totalPrice = total;
    customerOrder.status = "pending";
    let data = { customerOrder: customerOrder };
    sendOrder(data);
  };

  const sendOrder = (order) => {
    http
      .post(apiDA, order)
      .then((response) => {
        const data = response.data.customerOrder[0];
        setEnd(true);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <Modal
      centered
      show={confirm}
      onHide={handleClose}
      dialogClassName="productForm"
      scrollable="true"
      backdrop="static"
      size="sm"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      <Modal.Body className="pt-5 pb-5">
        <div className="d-flex justify-content-center mb-3">
          <IconContext.Provider value={{ size: "1.6em", color: "#7d9253" }}>
            <BsCheckCircleFill className="pt-1 m-0" />
          </IconContext.Provider>
        </div>
        <h3 className="text-center mb-5" style={{ color: "#424242" }}>
          Confirm order?
        </h3>
        <div className="d-flex justify-content-between">
          <button
            className="btn ms-5"
            style={{ backgroundColor: "#2B342D", color: "white" }}
            onClick={(e) => handleConfirm()}
          >
            Yes
          </button>
          <button
            className="btn me-5"
            style={{ backgroundColor: "#2B342D", color: "white" }}
            onClick={(e) => handleClose()}
          >
            No
          </button>
        </div>
      </Modal.Body>
      {end && <EndScreen />}
    </Modal>
  );
}

export default OrderConfirm;
