import React, { Fragment, useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import ShopContext from "./../../context/ShopContext";
import DeliveryContext from "./../../context/DeliveryContext";
import {
  MdKeyboardArrowRight,
  MdDeliveryDining,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { IconContext } from "react-icons";
import "./DeliveryInfo.css";
import DeliveryOptions from "./DeliveryOptions";
import DeliveryArea from "./DeliveryArea";

function DeliveryInfo() {
  const shopId = useContext(ShopContext);
  const apiOM = configData.apiUrl + "/orderMode/shop";
  const apiDM = configData.apiUrl + "/deliveryMode/shop";

  const [show, setShow] = useState(false);
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const [orderMode, setOrderMode] = useState();
  const [deliveryMode, setDeliveryMode] = useState();

  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const getOM = () => {
    http
      .get(apiOM + "/" + shopId)
      .then((response) => {
        const data = response.data.orderMode[0];
        setOrderMode(data);
        getDM(data);
      })
      .catch((error) => toast.error(error));
  };

  const getDM = (om) => {
    http
      .get(apiDM + "/" + shopId)
      .then((response) => {
        const data = response.data.deliveryMode[0];
        setDeliveryMode(data);
        if (!deliveryInfo) initializeDeliveryInfo(om, data);
      })
      .catch((error) => toast.error(error));
  };

  const initializeDeliveryInfo = (om, dm) => {
    let info = {
      deliveryMode: "",
      orderMode: "",
      deliveryTime: null,
      pickupTime: null,
      schedule: null,
    };

    if (dm.delivery) {
      info.deliveryMode = "delivery";
    } else {
      info.deliveryMode = "pickup";
    }

    if (dm.delivery_time) {
      info.deliveryTime =
        JSON.parse(dm.delivery_time).estimate.value +
        " " +
        JSON.parse(dm.delivery_time).estimate.type;
    }
    if (dm.pickup_time) {
      info.pickupTime =
        JSON.parse(dm.pickup_time).estimate.value +
        " " +
        JSON.parse(dm.pickup_time).estimate.type;
    }

    if (om.order_now) {
      info.orderMode = "ordernow";
    } else {
      info.orderMode = "preorder";
    }
    setDeliveryInfo(info);
  };

  const displayIcon = (info) => {
    if (info.deliveryMode == "delivery") {
      if (info.orderMode == "ordernow") {
        return (
          <table>
            <tbody>
              <tr>
                <th>
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <MdDeliveryDining className="mb-1 me-2" />
                  </IconContext.Provider>
                </th>
                <th>
                  <h5 className="card-title">Delivery</h5>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  {info.deliveryTime && (
                    <p
                      className="card-subtitle fw-normal"
                      style={{ color: "grey" }}
                    >
                      {info.deliveryTime}
                    </p>
                  )}
                </th>
              </tr>
            </tbody>
          </table>
        );
      }
      if (info.orderMode == "preorder") {
        return (
          <table>
            <tbody>
              <tr>
                <th>
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <MdDeliveryDining className="mb-1 me-2" />
                  </IconContext.Provider>
                </th>
                <th>
                  <h5 className="card-title">Delivery</h5>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  <p
                    className="card-subtitle fw-normal"
                    style={{ color: "grey" }}
                  >
                    preorder
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        );
      }
    }

    if (info.deliveryMode == "pickup") {
      if (info.orderMode == "ordernow") {
        return (
          <table>
            <tbody>
              <tr>
                <th>
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <MdOutlineShoppingBag className="mb-2 me-2" />
                  </IconContext.Provider>
                </th>
                <th>
                  <h5 className="card-title">Pick Up</h5>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  {info.pickupTime && (
                    <p
                      className="card-subtitle fw-normal"
                      style={{ color: "grey" }}
                    >
                      {info.pickupTime}
                    </p>
                  )}
                </th>
              </tr>
            </tbody>
          </table>
        );
      }
      if (info.orderMode == "preorder") {
        return (
          <table>
            <tbody>
              <tr>
                <th>
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <MdOutlineShoppingBag className="mb-2 me-2" />
                  </IconContext.Provider>
                </th>
                <th>
                  <h5 className="card-title">Pick Up</h5>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  <p
                    className="card-subtitle fw-normal"
                    style={{ color: "grey" }}
                  >
                    preorder
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        );
      }
    }
  };

  const displayDeliveryArea = (dm) => {
    if (dm) {
      if (dm.delivery == 1) {
        return <DeliveryArea />;
      }
    }
  };

  useEffect(() => {
    getOM();
  }, []);

  return (
    orderMode !== undefined && (
      <Fragment>
        <div className="d-flex justify-content-center mt-5 mb-3">
          <div
            id="deliveryinfocard"
            className="card ps-2 pe-2 border-0 shadow"
            style={{ width: "18rem", backgroundColor: "#F3F3F3" }}
            onClick={(e) => handleShow(e)}
          >
            <div className="card-body p-2 ms-3">
              {deliveryInfo && <div>{displayIcon(deliveryInfo)}</div>}
              <IconContext.Provider value={{ size: "1.3rem" }}>
                <MdKeyboardArrowRight
                  className="position-absolute top-50 end-0 translate-middle-y me-1"
                  style={{ color: "grey" }}
                />
              </IconContext.Provider>
            </div>
          </div>

          <DeliveryOptions
            deliveryMode={deliveryMode}
            orderMode={orderMode}
            show={show}
            setShow={setShow}
          />
        </div>
        {displayDeliveryArea(deliveryMode)}
        <div className="mb-5" />
      </Fragment>
    )
  );
}

export default DeliveryInfo;
