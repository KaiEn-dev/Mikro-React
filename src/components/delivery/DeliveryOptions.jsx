import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PreorderSchedule from "./PreorderSchedule";
import DeliveryContext from "./../../context/DeliveryContext";
import { toast } from "react-toastify";

function DeliveryOptions({ deliveryMode, orderMode, show, setShow }) {
  const [selectedInfo, setInfo] = useState();
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const [deliveryColour, setDeliveryColour] = useState([
    { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
    { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
  ]);
  const [orderColour, setOrderColour] = useState([
    { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
    { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
  ]);

  const initializeColour = () => {
    if (deliveryInfo.deliveryMode == "delivery") {
      setDeliveryColour([
        { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
        { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
      ]);
    }
    if (deliveryInfo.deliveryMode == "pickup") {
      setDeliveryColour([
        { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
        { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
      ]);
    }
    if (deliveryInfo.orderMode == "ordernow") {
      setOrderColour([
        { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
        { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
      ]);
    }
    if (deliveryInfo.orderMode == "preorder") {
      setOrderColour([
        { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
        { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
      ]);
    }
  };

  const handleClose = () => {
    setShow(false);
    if (!selectedInfo) setInfo(deliveryInfo);
    else {
      let newInfo = { ...selectedInfo };
      setDeliveryInfo(newInfo);
    }
    toast.success(
      <h6 className="p-0 m-0 ms-2" style={{ color: "#747474" }}>
        Delivery method updated !
      </h6>,
      {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const selectDelivery = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    let newinfo = selectedInfo;
    newinfo.deliveryMode = "delivery";
    setInfo(newinfo);
    setDeliveryColour([
      { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
      { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
    ]);
  };

  const selectPickup = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    let newinfo = selectedInfo;
    newinfo.deliveryMode = "pickup";
    setInfo(newinfo);
    setDeliveryColour([
      { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
      { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
    ]);
  };

  const selectOrder = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    let newinfo = selectedInfo;
    newinfo.orderMode = "ordernow";
    newinfo.schedule = null;
    setInfo(newinfo);
    setOrderColour([
      { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
      { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
    ]);
  };

  const selectPreorder = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    let newinfo = selectedInfo;
    newinfo.orderMode = "preorder";
    setInfo(newinfo);
    setOrderColour([
      { backgroundColor: "#F2F2F2", color: "#B0B0B0" },
      { backgroundColor: "#D1D1D1", color: "black", fontWeight: "bold" },
    ]);
  };

  const displayDeliverOptions = () => {
    if (deliveryMode) {
      return (
        <div className="d-grid">
          {deliveryMode.delivery == 1 && (
            <button
              className="btn rounded-0"
              type="button"
              onClick={(e) => selectDelivery()}
              style={deliveryColour[0]}
            >
              Delivery
            </button>
          )}
          {deliveryMode.pickup == 1 && (
            <button
              className="btn rounded-0"
              type="button"
              onClick={(e) => selectPickup()}
              style={deliveryColour[1]}
            >
              Pick up
            </button>
          )}
        </div>
      );
    }
  };

  const displayOrderOptions = () => {
    if (orderMode) {
      return (
        <div className="d-grid mt-4">
          {orderMode.order_now == 1 && (
            <button
              className="btn rounded-0"
              type="button"
              onClick={(e) => selectOrder()}
              style={orderColour[0]}
            >
              Order now
            </button>
          )}
          {orderMode.preorder == 1 && (
            <button
              className="btn rounded-0"
              type="button"
              onClick={(e) => selectPreorder()}
              style={orderColour[1]}
            >
              Preorder
            </button>
          )}
        </div>
      );
    }
  };

  const getInitialSchedule = () => {
    let initSchedule = [null, null, null];
    if (deliveryInfo) {
      if (deliveryInfo.schedule) {
        initSchedule[0] = deliveryInfo.schedule.date;
        initSchedule[1] = deliveryInfo.schedule.time;
        initSchedule[2] = getDateIndex(deliveryInfo.schedule.date);
        return initSchedule;

        //return info
      } else {
        return initSchedule;
      }
    } else {
      return initSchedule;
    }
  };

  const getDateIndex = (date) => {
    let index = 0;
    let schedule = JSON.parse(orderMode.preorder_option).option;

    for (let x of schedule) {
      if (x.date == date) {
        return index;
      }
      index++;
    }
    return null;
  };

  useEffect(() => {
    setInfo(deliveryInfo);
    if (deliveryInfo) initializeColour();
  }, [deliveryInfo]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="deliveryOptions"
        backdrop="static"
        keyboard={false}
        scrollable="false"
        size="sm"
        style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {displayDeliverOptions()}
          {displayOrderOptions()}
          <PreorderSchedule
            orderMode={orderMode}
            info={selectedInfo}
            setInfo={setInfo}
            initialInfo={getInitialSchedule()}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DeliveryOptions;
