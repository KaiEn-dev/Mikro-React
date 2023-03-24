import React from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function OrderList({ cart }) {
  const displayCategories = (selections) => {
    return (
      <div>
        {selections.map((category) => {
          return (
            <div key={uuidv4()} className="pt-2">
              <p key={uuidv4()} className="m-0" style={{ fontSize: "0.8em" }}>
                {category.name}
              </p>
              {displayAttributes(category.selection)}
            </div>
          );
        })}
      </div>
    );
  };

  const displayAttributes = (selection) => {
    return (
      <div>
        {selection.map((item) => {
          return (
            <p
              key={uuidv4()}
              className="m-0 ps-1"
              style={{ fontSize: "0.8em" }}
            >
              - {item.name}
            </p>
          );
        })}
      </div>
    );
  };

  const displayItem = (item) => {
    return (
      <div key={uuidv4()} className="card mb-2 shadow-sm rounded-3">
        <div className="card-body pe-1 position-relative">
          <div className="container d-flex justify-content-between pe-0">
            <div className="d-flex justify-content-start">
              <h6 className="fw-bold" style={{ width: "11em" }}>
                {item.product.product_name}
              </h6>
              <h6 className="ms-3" style={{ color: "#5E5E5E" }}>
                x{item.quantity}
              </h6>
            </div>
            <div style={{ width: "3em" }}>
              <h6>{item.price}</h6>
            </div>
          </div>
          <div className="container">{displayCategories(item.selections)}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {cart.map((item) => {
        return displayItem(item);
      })}
    </div>
  );
}

export default OrderList;
