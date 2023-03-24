import React, { useState, useEffect, useContext } from "react";
import { IconContext } from "react-icons";
import { IoCartSharp, IoCloseOutline } from "react-icons/io5";
import "./Cart.css";
import { Modal } from "react-bootstrap";
import CartContext from "../../context/CartContext";
import CartList from "./CartList";
import Checkout from "../checkout/Checkout";
import StatusContext from "../../context/StatusContext";

function Cart(props) {
  const [show, setShow] = useState(false);
  const { storeStatus, setStoreStatus } = useContext(StatusContext);
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  useEffect(() => {
    let totalPrice = 0;
    for (let item of cart) {
      totalPrice = totalPrice + item.price;
    }
    totalPrice = Math.round(totalPrice * 100) / 100;
    setTotal(totalPrice);

    if (cart.length > 0) {
      setCheckout(true);
    } else {
      setCheckout(false);
    }
  }, [cart]);

  return (
    storeStatus == 1 && (
      <div
        className="d-flex justify-content-end float-end"
        style={{
          position: "sticky",
          right: "0",
          bottom: "0",
          width: "0",
          zIndex: "1",
        }}
      >
        <div
          id="cart"
          className="p-3 m-3 rounded-circle shadow border border-4"
          style={{ backgroundColor: "#2B342D" }}
          onClick={(e) => handleShow(e)}
        >
          <IconContext.Provider value={{ size: "2em", color: "white" }}>
            <IoCartSharp />
          </IconContext.Provider>
        </div>
        <div style={{ backgroundColor: "black" }}>
          <Modal
            centered
            show={show}
            onHide={handleClose}
            dialogClassName="Cart"
            scrollable="true"
            backdrop="static"
            size="lg"
            style={{ height: "100%", width: "100%" }}
          >
            <Modal.Header style={{ padding: "0" }}>
              <div
                className="position-relative"
                style={{
                  height: "6em",
                  width: "100%",
                  backgroundColor: "#2B342D",
                }}
              >
                <div className="position-absolute top-0 end-0 p-2">
                  <IconContext.Provider value={{ size: "2em", color: "white" }}>
                    <IoCloseOutline
                      id="closecart"
                      onClick={(e) => handleClose()}
                    />
                  </IconContext.Provider>
                </div>
                <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
                  <IconContext.Provider value={{ size: "2em", color: "white" }}>
                    <IoCartSharp />
                  </IconContext.Provider>
                  <h4 className="ms-2" style={{ color: "white" }}>
                    Cart
                  </h4>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#F3F3F3" }}>
              <CartList cart={cart} setCart={setCart} />
            </Modal.Body>
            <Modal.Footer
              className="shadow-lg d-flex justify-content-between p-2"
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#2B342D",
              }}
            >
              <button className="btn fw-bold" style={{ color: "white" }}>
                Total : {total}
              </button>
              <Checkout checkout={checkout} total={total} cart={cart} />
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    )
  );
}

export default Cart;
