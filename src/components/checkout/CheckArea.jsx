import React, { useState, useContext, useEffect, Fragment } from "react";
import "../delivery/DeliveryArea.css";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import ShopContext from "./../../context/ShopContext";
import { MdInfoOutline } from "react-icons/md";
import { Modal } from "react-bootstrap";
import malaysia from "../../media/malaysia.jpg";
import city from "../../media/city.jpg";
import { RiEmotionSadLine, RiEmotionLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { getPostcodes } from "malaysia-postcodes";
import { AiFillQuestionCircle } from "react-icons/ai";

function CheckArea() {
  const apiDA = configData.apiUrl + "/deliveryArea/shop";
  const shopId = useContext(ShopContext);
  const [deliveryArea, setDeliveryArea] = useState(null);
  const [deliveryCoverage, setDeliveryCoverage] = useState(null);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  const getDeliveryArea = () => {
    http
      .get(apiDA + "/" + shopId)
      .then((response) => {
        const data = response.data.deliveryArea[0];
        setDeliveryArea(data.whole_malaysia);
        setDeliveryCoverage(JSON.parse(data.area));
      })
      .catch((error) => toast.error(error));
  };

  const getAllPostcodes = (dc) => {
    if (dc !== null) {
      let postcodes = [];
      let state = "";
      let city = "";
      let codes;

      dc.area.map((area) => {
        state = area.state;
        area.city.map((place) => {
          city = place;
          codes = getPostcodes(state, city);
          postcodes = postcodes.concat(codes);
        });
      });
      return postcodes;
    }
  };

  const handleClose = () => {
    setShow(false);
    setQuery("");
  };
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const displayDeliveryImg = (deliveryArea) => {
    if (deliveryArea !== null) {
      if (deliveryArea == 1) {
        return (
          <img src={malaysia} style={{ width: "75%", objectFit: "contain" }} />
        );
      }
      if (deliveryArea == 0) {
        return (
          <img
            src={city}
            style={{
              width: "55%",
              objectFit: "contain",
            }}
          />
        );
      }
    }
  };

  const getStates = (dc) => {
    if (dc) {
      let states = [];
      deliveryCoverage.area.map((area) => states.push(area.state));
      let stateStr = "";
      let punct = "";
      let index = 0;
      let last = states.length - 1;
      for (let state of states) {
        if (index !== 0) {
          punct = " , ";
        }
        if (index == last) {
          punct = " and ";
        }
        index++;
        stateStr = stateStr.concat(punct + state);
      }
      return stateStr;
    }
  };

  const displayDeliveryMsg = (da, dc) => {
    if (da !== null) {
      if (da == 1) {
        return (
          <div>
            <h5 className="text-center mt-5 mb-4 lh-sm">
              We are delivering to the Whole Malaysia
            </h5>
          </div>
        );
      }
      if (da == 0) {
        return (
          <div>
            <h5 className="text-center lh-sm">
              We are delivering to areas in <br />
              {getStates(dc)}
            </h5>
          </div>
        );
      }
    }
  };

  const displaySearch = (da) => {
    if (da == 0)
      return (
        <div>
          <div className="row d-flex justify-content-center pt-3 mt-4">
            <input
              className="form-control text-center border-0 p-2 shadow-sm"
              style={{ width: "10em", backgroundColor: "#F3F3F3" }}
              type="text"
              placeholder="Enter postcode"
              value={query}
              onChange={(e) => handleSearch(e.currentTarget.value)}
            />
          </div>
          {checkPostcode()}
        </div>
      );
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  const checkPostcode = () => {
    let postcodes = getAllPostcodes(deliveryCoverage);
    if (query.length !== 5)
      return (
        <div className="row d-flex justify-content-center pt-3 mt-3">
          <IconContext.Provider value={{ color: "grey", size: "1.5em" }}>
            <AiFillQuestionCircle />
          </IconContext.Provider>
          <p className="text-center mt-3" style={{ color: "grey" }}>
            Check if we are <br /> delivering to your area!
          </p>
        </div>
      );
    if (query.length == 5) {
      if (postcodes.includes(query))
        return (
          <div className="row d-flex justify-content-center pt-3 mt-3">
            <IconContext.Provider value={{ color: "grey", size: "2em" }}>
              <RiEmotionLine />
            </IconContext.Provider>
            <p
              className="text-center mt-2 fw-bold"
              style={{ fontSize: "0.9em" }}
            >
              Yes! We are delivering to your area
            </p>
          </div>
        );
      else
        return (
          <div className="row d-flex justify-content-center pt-3 mt-3">
            <IconContext.Provider value={{ color: "grey", size: "2em" }}>
              <RiEmotionSadLine />
            </IconContext.Provider>
            <p
              className="text-center mt-2 fw-bold"
              style={{ fontSize: "0.9em" }}
            >
              Sorry we are currently not delivering to your area
            </p>
          </div>
        );
    }
  };

  useEffect(() => {
    getDeliveryArea();
  }, []);

  return (
    <Fragment>
      <div
        id="deliveryInfo"
        className="p-0 ms-2 align-middle"
        onClick={(e) => handleShow(e)}
      >
        <IconContext.Provider value={{ color: "white", size: "1.2em" }}>
          <MdInfoOutline className="pb-1" />
        </IconContext.Provider>
      </div>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        dialogClassName="deliveryArea"
        scrollable="true"
        size="lg"
        style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Modal.Header
          closeButton
          style={{ paddingBottom: "0px", borderBottom: "0px" }}
        />
        <Modal.Body>
          <div className="container">
            <div className="row d-flex justify-content-center">
              {displayDeliveryImg(deliveryArea)}
            </div>
            <div className="mt-3">
              {displayDeliveryMsg(deliveryArea, deliveryCoverage)}
            </div>
            {displaySearch(deliveryArea)}
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default CheckArea;
