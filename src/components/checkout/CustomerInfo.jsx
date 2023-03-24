import React, { useContext } from "react";
import AddressForm from "./AddressForm";
import CheckArea from "./CheckArea";
import ContactForm from "./ContactForm";
import DeliveryContext from "./../../context/DeliveryContext";

function CustomerInfo({
  customerInfo,
  setCustomerInfo,
  error,
  setError,
  postcodeError,
  setPostcodeError,
}) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);

  const displayError = (e) => {
    if (error[e]) {
      return <div className="alert alert-danger p-2 mt-2">{error[e]}</div>;
    }
  };

  const displayForm = (info) => {
    if (info.deliveryMode == "delivery") {
      return (
        <div className="pt-2 pb-3">
          <h4
            className="p-3 mt-2 mb-2 border border-2 rounded-3 shadow-sm d-flex"
            style={{ backgroundColor: "#747963", color: "white" }}
          >
            Delivery Address
            <CheckArea />
          </h4>
          <AddressForm
            customerInfo={customerInfo}
            setCustomerInfo={setCustomerInfo}
            error={error}
            setError={setError}
            displayError={displayError}
            postcodeError={postcodeError}
            setPostcodeError={setPostcodeError}
          />
        </div>
      );
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="pt-2 pb-3">
        <h4
          className="p-3 mt-0 mb-2 border border-2 rounded-3 shadow-sm"
          style={{ backgroundColor: "#747963", color: "white" }}
        >
          Contact Information
        </h4>
        <ContactForm
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          error={error}
          displayError={displayError}
        />
      </div>

      {displayForm(deliveryInfo)}
    </div>
  );
}

export default CustomerInfo;
