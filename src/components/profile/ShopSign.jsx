import React, { useContext, Fragment, useEffect, useState } from "react";
import ShopContext from "./../../context/ShopContext";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import ShopDetails from "./ShopDetails";
import ShopMap from "./ShopMap";
import StatusContext from "./../../context/StatusContext";

function ShopSign() {
  const shopId = useContext(ShopContext);
  const apiShop = configData.apiUrl + "/shop";
  const apiImage = configData.apiUrl + "/image";

  const [profile, setProfile] = useState({});
  const [image, setImage] = useState("");
  const { storeStatus, setStoreStatus } = useContext(StatusContext);

  const getProfile = () => {
    http
      .get(apiShop + "/" + shopId)
      .then((response) => {
        const data = response.data.shop[0];
        setProfile(data);
        getImage(data.shop_image);
        setStoreStatus(data.availability);
      })
      .catch((error) => toast.error(error));
  };

  const getImage = (id) => {
    http
      .get(apiImage + "/" + id)
      .then((response) => {
        const data = response.data.image[0].image_link;
        setImage(data);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <div className="d-flex flex-column align-items-center m-4 pt-3 border-0">
        <img
          className="rounded-circle border border-3 border-white shadow-sm"
          src={image}
          alt=""
          style={{ height: "300px", width: "300px", objectFit: "contain" }}
        />
        <div>
          <div>
            <div className="d-flex justify-content-center">
              <h1 className="mt-3">{profile.shop_name}</h1>
            </div>
            <div className="d-flex justify-content-center">
              <p className="text-wrap ">{profile.shop_description}</p>
            </div>
          </div>
        </div>
        <ShopDetails shopId={shopId} image={image} profile={profile} />
      </div>
    </Fragment>
  );
}

export default ShopSign;
