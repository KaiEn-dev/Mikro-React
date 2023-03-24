import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FiEdit } from "react-icons/fi";
import CartList from "./CartList";
import { MdClose } from "react-icons/md";
import EditForm from "./EditForm/EditForm";
import { Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function CartItem({ item, handleDelete }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const displayCategories = (selections) => {
    let attList = [];
    for (let category of selections) {
      if (category.selection.length > 0) {
        let newdata = { name: category.name, selection: category.selection };
        attList = attList.concat(newdata);
      }
    }

    return (
      <div>
        {attList.map((category) => {
          return (
            <div key={uuidv4()} className="pt-2">
              <p key={uuidv4()} className="m-0" style={{ fontSize: "0.8em" }}>
                {category.name}
              </p>
              {category.selection && (
                <div>{displayAttributes(category.selection)}</div>
              )}
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
  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body pe-1 position-relative">
        <div className="container d-flex justify-content-between pe-0">
          <div className="d-flex justify-content-start">
            <h6 className="fw-bold" style={{ width: "10em" }}>
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
        <button
          className="btn d-flex position-absolute bottom-0 end-0 p-1 m-3 shadow-sm"
          style={{ backgroundColor: "#7D8171" }}
          onClick={(e) => handleShow(item)}
        >
          <p className="m-0 me-1" style={{ fontSize: "0.8em", color: "white" }}>
            Edit
          </p>
          <IconContext.Provider value={{ size: "1em", color: "white" }}>
            <FiEdit />
          </IconContext.Provider>
        </button>
        <button
          className="btn d-flex justify-content-center align-items-center rounded-circle p-0 position-absolute top-0 start-100 translate-middle border border-3"
          style={{
            backgroundColor: "#afb7c5",
            width: "1.5em",
            height: "1.5em",
          }}
          onClick={(e) => handleDelete()}
        >
          <IconContext.Provider value={{ size: "1em", color: "white" }}>
            <MdClose />
          </IconContext.Provider>
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="productForm"
        scrollable="true"
        backdrop="static"
        size="lg"
        style={{ height: "100%" }}
      >
        <Modal.Body className="p-0">
          <EditForm
            product={item.product}
            image={item.image}
            item={item}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CartItem;
