import React, { useState, useContext, useEffect } from "react";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import ShopContext from "./../../context/ShopContext";
import { getPostcodes } from "malaysia-postcodes";

function AddressForm({
  customerInfo,
  setCustomerInfo,
  error,
  setError,
  displayError,
  postcodeError,
  setPostcodeError,
}) {
  const apiDA = configData.apiUrl + "/deliveryArea/shop";
  const shopId = useContext(ShopContext);
  const [deliveryArea, setDeliveryArea] = useState(null);
  const [deliveryCoverage, setDeliveryCoverage] = useState(null);

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

  const checkPostcode = (code) => {
    if (deliveryArea) {
      return true;
    } else {
      let postcodes = getAllPostcodes(deliveryCoverage);
      if (postcodes.includes(code)) {
        return true;
      }
      return false;
    }
  };

  const handleChange = (value, id) => {
    let newErr = { ...error };
    delete newErr.postcode;
    setError(newErr);
    let newInfo = { ...customerInfo };
    newInfo[id] = value;
    setCustomerInfo(newInfo);
    setPostcodeError(false);
    if (value.length == 5) {
      if (checkPostcode(value) == false) {
        setPostcodeError(true);
      }
    }
  };

  const displayPostcodeError = (e) => {
    if (e == true) {
      return (
        <div className="alert alert-danger p-2 mt-2">
          We are currently not delivering to your area
        </div>
      );
    }
  };

  useEffect(() => {
    getDeliveryArea();
  }, []);

  return (
    <div>
      <form className="ps-1 pe-1">
        <div className="form-group mb-2">
          <label htmlFor="address" className="ms-1">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="form-control"
            value={customerInfo.address}
            onChange={(e) =>
              handleChange(e.currentTarget.value, e.currentTarget.id)
            }
          />
          {displayError("address")}
        </div>
        <div className="form-group">
          <label htmlFor="postcode" className="ms-1">
            Postcode
          </label>
          <input
            id="postcode"
            type="text"
            className="form-control"
            value={customerInfo.postcode}
            onChange={(e) =>
              handleChange(e.currentTarget.value, e.currentTarget.id)
            }
          />
          {displayError("postcode")}
          {displayPostcodeError(postcodeError)}
        </div>
        <div id="emailHelp" className="form-text mt-2">
          Make sure everything is accurate, we will be serving you based on
          these information
        </div>
      </form>
    </div>
  );
}

export default AddressForm;
