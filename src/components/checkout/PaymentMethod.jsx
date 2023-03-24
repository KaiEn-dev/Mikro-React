import React, { useState, Fragment } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IconContext } from "react-icons";
import { Modal } from "react-bootstrap";
import { BsCash, BsCreditCard } from "react-icons/bs";
import { AiFillBank, AiFillQuestionCircle } from "react-icons/ai";
import { GrPaypal } from "react-icons/gr";
import { toast } from "react-toastify";

function PaymentMethod({ payment, setPayment }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    toast.success("Payment method updated !", {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const getFont = (method) => {
    if (method == payment) {
      return { color: "white", fontWeight: "bold" };
    } else {
      return { color: "#7E7E7E" };
    }
  };

  const getBackground = (method) => {
    if (method == payment) {
      return { width: "100%", backgroundColor: "#747963" };
    } else {
      return { width: "100%", backgroundColor: "#DADADA" };
    }
  };

  const getIconColor = (method) => {
    if (method == payment) {
      return { color: "white" };
    } else {
      return { color: "#7E7E7E" };
    }
  };

  const handleSelect = (method) => {
    if (method !== 1) {
      toast.warn(" Payment method unavailable ", {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (method == payment) {
      setPayment(null);
    } else {
      setPayment(method);
    }
  };

  const displayMethodIcon = (payment) => {
    if (payment == 1) {
      return (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <BsCash className="mb-1 me-2" />
        </IconContext.Provider>
      );
    } else {
      return (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          <AiFillQuestionCircle className="mb-1 me-2" />
        </IconContext.Provider>
      );
    }
  };

  const displayMethodName = (payment) => {
    if (payment == 1) {
      return (
        <p className="card-subtitle fw-normal" style={{ color: "grey" }}>
          Cash on delivery
        </p>
      );
    } else {
      return (
        <p className="card-subtitle fw-normal" style={{ color: "grey" }}>
          not chosen
        </p>
      );
    }
  };

  const displayPaymentInfo = (e) => {
    return (
      <table>
        <tbody>
          <tr>
            <th>{displayMethodIcon(payment)}</th>
            <th>
              <h5 className="card-title">Payment</h5>
            </th>
          </tr>
          <tr>
            <th></th>
            <th>{displayMethodName(payment)}</th>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center mt-4">
        <div
          id="deliveryinfocard"
          className="card p-2 border-0 shadow"
          style={{ width: "100%", backgroundColor: "white" }}
          onClick={(e) => handleShow(e)}
        >
          <div className="card-body p-2 ms-3">
            {displayPaymentInfo()}
            <IconContext.Provider value={{ size: "1.3rem" }}>
              <MdKeyboardArrowRight
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ color: "grey" }}
              />
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        scrollable="true"
        backdrop="static"
        size="lg"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <button
              className="btn mb-2 p-3 shadow-sm"
              style={getBackground(1)}
              onClick={(e) => handleSelect(1)}
            >
              <div className="d-flex ms-4">
                <IconContext.Provider value={{ size: "1.8rem" }}>
                  <BsCash className="" style={getIconColor(1)} />
                </IconContext.Provider>
                <h5 className="ms-3" style={getFont(1)}>
                  Cash on delivery
                </h5>
              </div>
            </button>
            <button
              className="btn mb-2 p-3 shadow-sm"
              style={{ width: "100%", backgroundColor: "#F2F2F2" }}
              onClick={(e) => handleSelect(2)}
            >
              <div className="d-flex ms-4">
                <IconContext.Provider value={{ size: "1.8rem" }}>
                  <BsCreditCard className="" style={{ color: "#CCCCCC" }} />
                </IconContext.Provider>
                <h5 className="ms-3" style={{ color: "#CCCCCC" }}>
                  Credit / Debit
                </h5>
              </div>
            </button>
            <button
              className="btn mb-2 p-3 shadow-sm"
              style={{ width: "100%", backgroundColor: "#F2F2F2" }}
              onClick={(e) => handleSelect(3)}
            >
              <div className="d-flex ms-4">
                <IconContext.Provider value={{ size: "1.8rem" }}>
                  <AiFillBank className="" style={{ color: "#CCCCCC" }} />
                </IconContext.Provider>
                <h5 className="ms-3" style={{ color: "#CCCCCC" }}>
                  Online banking
                </h5>
              </div>
            </button>
            <button
              className="btn mb-2 p-3 shadow-sm"
              style={{ width: "100%", backgroundColor: "#F2F2F2" }}
              onClick={(e) => handleSelect(4)}
            >
              <div className="d-flex ms-4">
                <IconContext.Provider value={{ size: "1.5rem" }}>
                  <GrPaypal className="" style={{ color: "#CCCCCC" }} />
                </IconContext.Provider>
                <h5 className="ms-3" style={{ color: "#CCCCCC" }}>
                  Paypal
                </h5>
              </div>
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default PaymentMethod;
