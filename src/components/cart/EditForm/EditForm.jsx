import React, { useState, useEffect, useContext } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoCloseOutline, IoAdd, IoRemove } from "react-icons/io5";
import EditFormAttributes from "./EditFormAttributes";
import "./EditForm.css";
import CartContext from "./../../../context/CartContext";
import { toast } from "react-toastify";
import _ from "lodash";

function EditForm({ product, image, item, handleClose }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const [totalPrice, setTotalPrice] = useState(item.price);
  const [priceList, setPriceList] = useState([]);
  const [fullComplete, setFullComplete] = useState([]);
  const [fullSelection, setFullSelection] = useState(item.selections);
  const [complete, setComplete] = useState(true);

  const displayAttCategories = () => {
    return (
      <div>
        {fullSelection.map((item) => {
          return (
            <EditFormAttributes
              key={item.id}
              paId={item.id}
              addPrice={addPrice}
              fullComplete={fullComplete}
              setFullComplete={setFullComplete}
              fullSelection={fullSelection}
              setFullSelection={setFullSelection}
              initSelection={item.selection}
              n={fullSelection.length}
            />
          );
        })}
      </div>
    );
  };

  const addPrice = (price) => {
    let newList = priceList;
    newList.push(price);
    setPriceList(newList);
  };

  const calculateTotal = (selections) => {
    let total = product.price;
    let selectionList = [];

    if (fullSelection.length == JSON.parse(product.product_attribute).length) {
      for (let item of fullSelection) {
        selectionList = selectionList.concat(item.selection);
      }

      for (let item of selectionList) {
        for (let charge of priceList) {
          if (charge.id == item.id) {
            total = total + charge.charge;
          }
        }
      }
    }

    total = total * quantity;
    total = Math.round(total * 100) / 100;
    setTotalPrice(total);
    return total;
  };

  const checkCompletion = () => {
    if (fullComplete.length == JSON.parse(product.product_attribute).length) {
      let completionFlag = true;
      for (let item of fullComplete) {
        if (item.completion === false) {
          completionFlag = false;
        }
      }
      setComplete(completionFlag);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [fullSelection, quantity]);

  useEffect(() => {
    checkCompletion();
  }, [fullComplete]);

  const handleAdd = () => {
    let newQ = quantity + 1;
    setQuantity(newQ);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      let newQ = quantity - 1;
      setQuantity(newQ);
    }
  };

  const handleUpdateCart = () => {
    let deleteIndex = 0;
    let targetIndex;
    for (let thing of cart) {
      if (_.isEqual(thing, item)) {
        targetIndex = deleteIndex;
      }
      deleteIndex++;
    }

    let newData = cart.slice();
    newData.splice(targetIndex, 1);

    let newItem = {
      product: product,
      image: image,
      price: totalPrice,
      quantity: quantity,
      selections: fullSelection,
    };

    let equal = false;

    if (cart.length > 0) {
      for (let item of newData) {
        let compare1 = { ...newItem };
        delete compare1.quantity;
        delete compare1.price;
        let compare2 = { ...item };
        delete compare2.quantity;
        delete compare2.price;
        if (_.isEqual(compare1, compare2)) {
          item.quantity = item.quantity + newItem.quantity;
          let total = item.price + newItem.price;
          total = Math.round(total * 100) / 100;
          item.price = total;
          equal = true;
        }
      }
    }

    if (!equal) {
      newData = newData.concat(newItem);
    }
    setCart(newData);
    handleClose();
    toast.success(
      <h6 className="p-0 m-0 ms-2" style={{ color: "#747474" }}>
        Cart updated !
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

  return (
    <div>
      <Modal.Header
        className="sticky-top shadow"
        style={{
          paddingBottom: "0px",
          borderBottom: "0px",
          backgroundImage: `url(${image})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "0",
        }}
      >
        <div
          className="position-relative"
          style={{
            height: "14em",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="position-absolute top-0 end-0 p-2">
            <IconContext.Provider value={{ size: "2em", color: "white" }}>
              <IoCloseOutline onClick={(e) => handleClose()} />
            </IconContext.Provider>
          </div>
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-center">
            <h1 style={{ color: "white" }}>{product.product_name}</h1>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between border-bottom border-top mt-1 mb-3">
          <div className="d-flex align-items-center">
            <p className="ps-2 pe-4 fw-bold" style={{ color: "grey" }}>
              {product.product_description}
            </p>
          </div>
          <div className="m-2 pt-2 pe-1">
            <h4 className="text-center fw-bold">{product.price}</h4>
            <p className="text-center" style={{ color: "grey" }}>
              Base price
            </p>
          </div>
        </div>
        <div>{displayAttCategories()}</div>
      </Modal.Body>
      <Modal.Footer
        className="shadow-lg d-flex justify-content-between p-2"
        style={{ position: "sticky", bottom: "0", backgroundColor: "#2B342D" }}
      >
        <div className="align-middle">
          <button
            disabled={quantity == 1}
            className="btn p-0"
            style={{ width: "auto" }}
            onClick={(e) => handleMinus()}
          >
            <IconContext.Provider value={{ size: "1.3em", color: "white" }}>
              <IoRemove />
            </IconContext.Provider>
          </button>
          <button id="quantity" className="btn fw-bold ms-2 me-2" disabled>
            {quantity}
          </button>
          <button
            className="btn p-0"
            style={{ width: "auto" }}
            onClick={(e) => handleAdd()}
          >
            <IconContext.Provider
              value={{
                size: "1.3em",
                color: "white",
              }}
            >
              <IoAdd />
            </IconContext.Provider>
          </button>
        </div>
        <div>
          <h5 className="p-0 m-0" style={{ color: "white" }}>
            {"Rm " + totalPrice}
          </h5>
        </div>
        <div>
          <button
            id="add2cart"
            disabled={!complete}
            className="btn fw-bold ps-2 pe-2"
            onClick={(e) => handleUpdateCart()}
          >
            Update Cart
          </button>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default EditForm;
