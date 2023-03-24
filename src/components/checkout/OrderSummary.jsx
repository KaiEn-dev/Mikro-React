import React from "react";
import OrderList from "./OrderList";

function OrderSummary({ cart, total }) {
  return (
    <div className="overflow-auto " style={{ width: "100%" }}>
      <h2
        className="p-3 mt-2 mb-2 border border-2 rounded-3 shadow-sm"
        style={{ backgroundColor: "#747963", color: "white" }}
      >
        Order Summary
      </h2>
      <OrderList cart={cart} />
      <div
        className="card mb-2 shadow-sm rounded-3 border border-2"
        style={{ backgroundColor: "#747963" }}
      >
        <div className="card-body pe-1 position-relative">
          <div className="container d-flex justify-content-end pe-0">
            <h6 className="me-3" style={{ color: "white" }}>
              Total :
            </h6>

            <div style={{ width: "3em" }}>
              <h6 style={{ color: "white" }}>{total}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
