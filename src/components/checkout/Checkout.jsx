import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import CustomerInfo from "./CustomerInfo";
import DeliveryPayment from "./DeliveryPayment";
import OrderSummary from "./OrderSummary";
import { MdOutlineNavigateNext } from "react-icons/md";
import CustomerContext from "./../../context/CustomerContext";
import Joi from "joi-browser";
import _ from "lodash";
import OrderConfirm from "./OrderConfirm";

function Checkout({ checkout, total, cart }) {
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState(1);
  const [stage2, setStage2] = useState(false);
  const { customerInfo, setCustomerInfo } = useContext(CustomerContext);
  const [error, setError] = useState({});
  const [postcodeError, setPostcodeError] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const handleCheckOut = (e) => {
    handleShow(e);
  };

  const handleBack = () => {
    setError({});
    if (stage == 1) {
      handleClose();
    }
    if (stage > 1) {
      setStage(stage - 1);
    }
  };

  const handleNext = () => {
    setStage(stage + 1);
  };

  const displayStage = (stage) => {
    if (stage == 1) {
      return <OrderSummary cart={cart} total={total} />;
    }
    if (stage == 2) {
      return <DeliveryPayment stage2={stage2} setStage2={setStage2} />;
    }
    if (stage == 3) {
      return (
        <CustomerInfo
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          error={error}
          setError={setError}
          postcodeError={postcodeError}
          setPostcodeError={setPostcodeError}
        />
      );
    }
  };

  const handleComplete = () => {
    let resetError = {};
    setError(resetError);
    validateForm();
    if (_.isEmpty(error)) {
      if (postcodeError == false) {
        console.log("CONFIRM!");
        setConfirm(true);
      }
    }
  };

  // Form validation
  const schema = {
    name: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    phone: Joi.string().length(10).required().label("Phone number"),
    address: Joi.string().required().label("Address"),
    postcode: Joi.string().length(5).required().label("Postcode"),
  };

  const validateForm = () => {
    const result = Joi.validate(customerInfo, schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    setError(errors);
  };

  const displayNextButton = (stage) => {
    if (stage == 1) {
      return (
        <button
          className="btn d-flex pe-1"
          style={{
            backgroundColor: "#2B342D",
            color: "white",
          }}
          onClick={(e) => handleNext()}
        >
          Next
          <IconContext.Provider value={{ size: "1.5em", color: "white" }}>
            <MdOutlineNavigateNext />
          </IconContext.Provider>
        </button>
      );
    }
    if (stage == 2) {
      return (
        <button
          disabled={!stage2}
          className="btn d-flex pe-1"
          style={{
            backgroundColor: "#2B342D",
            color: "white",
          }}
          onClick={(e) => handleNext()}
        >
          Next
          <IconContext.Provider value={{ size: "1.5em", color: "white" }}>
            <MdOutlineNavigateNext />
          </IconContext.Provider>
        </button>
      );
    }
    if (stage == 3) {
      return (
        <button
          className="btn d-flex pe-1"
          style={{
            backgroundColor: "#2B342D",
            color: "white",
          }}
          onClick={(e) => handleComplete()}
        >
          Complete
          <IconContext.Provider value={{ size: "1.5em", color: "white" }}>
            <MdOutlineNavigateNext />
          </IconContext.Provider>
        </button>
      );
    }
  };

  return (
    <div>
      <button
        id="checkout"
        disabled={!checkout}
        className="btn fw-bold"
        style={{ color: "black", backgroundColor: "white" }}
        onClick={(e) => handleCheckOut(e)}
      >
        Check Out
      </button>
      <Modal
        centered
        show={show}
        fullscreen={true}
        onHide={handleClose}
        dialogClassName="productForm"
        scrollable="true"
        backdrop="static"
        size="lg"
        style={{ height: "100%", width: "100%" }}
      >
        <Modal.Header className="shadow" style={{ backgroundColor: "#2B342D" }}>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <button className="btn p-0" onClick={(e) => handleBack()}>
              <IconContext.Provider value={{ size: "1.5em", color: "white" }}>
                <BiArrowBack />
              </IconContext.Provider>
            </button>
            <button className="btn p-0" onClick={(e) => handleClose()}>
              <IconContext.Provider value={{ size: "2em", color: "white" }}>
                <IoCloseOutline id="closecart" onClick={(e) => handleClose()} />
              </IconContext.Provider>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#F3F3F3" }}>
          <div
            className="container d-flex justify-content-center p-0"
            style={{ height: "100%" }}
          >
            {displayStage(stage)}
          </div>
        </Modal.Body>
        <Modal.Footer
          className="border-0 shadow-lg"
          style={{ backgroundColor: "#F3F3F3" }}
        >
          {displayNextButton(stage)}
        </Modal.Footer>
      </Modal>
      {confirm && (
        <OrderConfirm confirm={confirm} setConfirm={setConfirm} total={total} />
      )}
    </div>
  );
}

export default Checkout;
