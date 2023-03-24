import React, { Fragment, useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./ShopDetails.css";
import { Modal } from "react-bootstrap";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import ShopMap from "./ShopMap";
import { SiWaze, SiGooglemaps } from "react-icons/si";
import { IconContext } from "react-icons";
import GetGoogleMaps from "./../../services/googleMapService";
import GetWaze from "./../../services/wazeService";

function ShopDetails({ shopId, image, profile }) {
  const apiEndpoint1 = configData.apiUrl + "/operatingHour/shop";
  const apiEndpoint2 = configData.apiUrl + "/address/shop";

  const [show, setShow] = useState(false);
  const [operatingData, setOperatingData] = useState([]);
  const [address, setAddress] = useState([]);

  const getOH = () => {
    http
      .get(apiEndpoint1 + "/" + shopId)
      .then((response) => {
        if (response.data.operatingHour[0]) {
          const data = response.data.operatingHour[0];
          setOperatingData(data);
        }
      })
      .catch((error) => toast.error(error));
  };

  const getAddress = () => {
    http
      .get(apiEndpoint2 + "/" + shopId)
      .then((response) => {
        if (response.data.address[0]) {
          const data = response.data.address[0];
          setAddress(data);
        }
      })
      .catch((error) => toast.error(error));
  };

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setShow(true);
  };

  const getOperationHours = () => {
    let operatingWeek = [];

    let operatingDay1 = {
      name: "Monday",
      day: operatingData.mon,
      open: operatingData.mon_open,
      close: operatingData.mon_close,
    };
    let operatingDay2 = {
      name: "Tuesday",
      day: operatingData.tues,
      open: operatingData.tues_open,
      close: operatingData.tues_close,
    };
    let operatingDay3 = {
      name: "Wednesday",
      day: operatingData.wed,
      open: operatingData.wed_open,
      close: operatingData.wed_close,
    };
    let operatingDay4 = {
      name: "Thursday",
      day: operatingData.thur,
      open: operatingData.thur_open,
      close: operatingData.thur_close,
    };
    let operatingDay5 = {
      name: "Friday",
      day: operatingData.fri,
      open: operatingData.fri_open,
      close: operatingData.fri_close,
    };
    let operatingDay6 = {
      name: "Saturday",
      day: operatingData.sat,
      open: operatingData.sat_open,
      close: operatingData.sat_close,
    };
    let operatingDay7 = {
      name: "Sunday",
      day: operatingData.sun,
      open: operatingData.sun_open,
      close: operatingData.sun_close,
    };
    let operatingDayEnd = {
      day: 2,
    };

    operatingWeek.push(operatingDay1);
    operatingWeek.push(operatingDay2);
    operatingWeek.push(operatingDay3);
    operatingWeek.push(operatingDay4);
    operatingWeek.push(operatingDay5);
    operatingWeek.push(operatingDay6);
    operatingWeek.push(operatingDay7);
    operatingWeek.push(operatingDayEnd);

    return operatingWeek;
  };

  const summariseOH = () => {
    let OH = getOperationHours();
    let summarisedOH = [];
    let startDay;
    let endDay;
    let counter = 0;

    for (let oh of OH) {
      if (oh.day == 1) {
        if (startDay) {
          if (oh.open == startDay.open && oh.close == startDay.close) {
            endDay = oh;
          } else {
            let summarisedDays = {
              day: "",
              open: "",
              close: "",
            };
            if (endDay) {
              summarisedDays.day = startDay.name + " - " + endDay.name;
            } else {
              summarisedDays.day = startDay.name;
            }
            summarisedDays.open = startDay.open;
            summarisedDays.close = startDay.close;
            summarisedOH.push(summarisedDays);
            startDay = oh;
            endDay = undefined;
          }
        } else {
          startDay = oh;
        }
      }
      if (oh.day == 2) {
        if (startDay) {
          let summarisedDays = {
            day: "",
            open: "",
            close: "",
          };
          if (endDay) {
            summarisedDays.day = startDay.name + " - " + endDay.name;
          } else {
            summarisedDays.day = startDay.name;
          }
          summarisedDays.open = startDay.open;
          summarisedDays.close = startDay.close;
          summarisedOH.push(summarisedDays);
        }
      }
      if (oh.day == 0) {
        if (startDay) {
          let summarisedDays = {
            day: "",
            open: "",
            close: "",
          };
          if (endDay) {
            summarisedDays.day = startDay.name + "-" + endDay.name;
          } else {
            summarisedDays.day = startDay.name;
          }
          summarisedDays.open = startDay.open;
          summarisedDays.close = startDay.close;
          summarisedOH.push(summarisedDays);
          startDay = undefined;
          endDay = undefined;
        } else {
          startDay = undefined;
          endDay = undefined;
        }
      }
    }

    return summarisedOH;
  };

  const getCoordinates = () => {
    return [address.latitude, address.longitude];
  };

  const handleGoogleMaps = (coor, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    window.open(GetGoogleMaps(coor[0], coor[1]));
  };

  const handleWaze = (coor, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    window.open(GetWaze(coor[0], coor[1]));
  };

  useEffect(() => {
    getOH();
    getAddress();
  }, []);

  return (
    <Fragment>
      <p
        id="learnmore"
        className="text-muted fs-6"
        onClick={(e) => handleShow(e)}
      >
        learn more{<MdKeyboardArrowRight />}
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="shopdetails"
        scrollable="true"
        size="lg"
        style={{ height: "100%" }}
      >
        <div className="shadow-sm">
          <Modal.Header
            closeButton
            style={{ paddingBottom: "0px", borderBottom: "0px" }}
          ></Modal.Header>
          <Modal.Header className="pb-5" style={{ borderBottom: "0px" }}>
            <div className="container d-flex">
              <img
                src={image}
                alt=""
                style={{
                  height: "150px",
                  width: "150px",
                  objectFit: "contain",
                }}
              />
              <div className="container position-relative">
                <div className="ms-4 position-absolute top-50 start-0 translate-middle-y">
                  <h3 className="mt-3">{profile.shop_name}</h3>
                  <p className="text-wrap" style={{ fontSize: "0.8em" }}>
                    {profile.shop_description}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Header>
        </div>
        <Modal.Body>
          <h4 className="mt-3 mb-3">About</h4>
          <div style={{ height: "2px", backgroundColor: "#F5F5F5" }}></div>
          <h6 className="mt-3 mb-3" style={{ color: "#636363" }}>
            Operating hours
          </h6>
          <table>
            <tbody>
              {summariseOH().map((oh) => (
                <tr key={oh.day} style={{ fontSize: "0.9em" }}>
                  <th key="day">
                    <p className="fw-normal">{oh.day}</p>
                  </th>
                  <th key="time" className="ps-4">
                    <p className="fw-normal">
                      {oh.open.substring(0, oh.open.length - 3) +
                        " - " +
                        oh.close.substring(0, oh.close.length - 3)}
                    </p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {profile.address == 1 && (
            <div>
              <h6 className="mt-3 mb-3" style={{ color: "#636363" }}>
                Location
                <button
                  className="btn ms-3 me-1 pt-1"
                  onClick={(e) => handleGoogleMaps(getCoordinates(), e)}
                  style={{ color: "#636363" }}
                >
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <SiGooglemaps />
                  </IconContext.Provider>
                </button>
                <button
                  className="btn ms-1 me-1 pt-1"
                  onClick={(e) => handleWaze(getCoordinates(), e)}
                  style={{ color: "#636363" }}
                >
                  <IconContext.Provider value={{ size: "1.5rem" }}>
                    <SiWaze />
                  </IconContext.Provider>
                </button>
              </h6>
              <p style={{ fontSize: "0.9em" }}>{address.address}</p>

              <ShopMap
                shopName={profile.shop_name}
                coordinates={getCoordinates()}
              ></ShopMap>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default ShopDetails;
