import React from "react";
import CartItem from "./CartItem";
import { IconContext } from "react-icons";
import { BiWinkSmile, BiQuestionMark } from "react-icons/bi";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function CartList({ cart, setCart }) {
  const handleDelete = (item) => {
    let index = 0;
    let target;
    for (let obj of cart) {
      if (_.isEqual(obj, item)) {
        target = index;
      }
      index++;
    }

    let newData = cart.slice();
    newData.splice(target, 1);
    setCart(newData);
    toast.success(
      <h6 className="p-0 m-0 ms-2" style={{ color: "#747474" }}>
        Item removed from cart !
      </h6>,
      {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const displayitems = () => {
    if (cart.length == 0) {
      return (
        <div className="row d-flex justify-content-center mt-5 mb-5 pt-5 pb-5">
          <IconContext.Provider value={{ size: "2em", color: "grey" }}>
            <BiWinkSmile />
          </IconContext.Provider>
          <h6 className="text-center mt-2">
            No items are added to your cart... yet
          </h6>
        </div>
      );
    } else {
      return (
        <div>
          {cart.map((item) => {
            return (
              <CartItem
                key={uuidv4()}
                item={item}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      );
    }
  };

  return <div>{displayitems()}</div>;
}

export default CartList;
