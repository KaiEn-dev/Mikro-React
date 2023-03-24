import React, { useEffect, useContext } from "react";
import OrderOption from "./OrderOption";
import PaymentMethod from "./PaymentMethod";
import DeliveryContext from "./../../context/DeliveryContext";
import PaymentContext from "./../../context/PaymentContext";

function DeliveryPayment({ stage2, setStage2 }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const { payment, setPayment } = useContext(PaymentContext);

  const checkCompletion = () => {
    let completion = 0;

    if (payment !== null) {
      completion++;
    }

    completion++;

    if (deliveryInfo.orderMode == "preorder") {
      if (deliveryInfo.schedule == null) {
        completion--;
      }
    }

    if (completion == 2) {
      setStage2(true);
    } else {
      setStage2(false);
    }
  };

  useEffect(() => {
    checkCompletion();
  }, [deliveryInfo, payment]);

  return (
    <div style={{ width: "100%" }}>
      <div className="pt-3 pb-3">
        <h4
          className="p-3 mt-2 mb-2 border border-2 rounded-3 shadow-sm"
          style={{ backgroundColor: "#747963", color: "white" }}
        >
          Delivery Method
        </h4>
        <OrderOption />
      </div>

      <div>
        <h4
          className="p-3 mt-2 mb-2 border border-2 rounded-3 shadow-sm"
          style={{ backgroundColor: "#747963", color: "white" }}
        >
          Payment Method
        </h4>
        <PaymentMethod payment={payment} setPayment={setPayment} />
      </div>
    </div>
  );
}

export default DeliveryPayment;
