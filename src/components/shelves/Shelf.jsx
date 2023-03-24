import React, { useState, useContext, useEffect, Fragment } from "react";
import ShopContext from "./../../context/ShopContext";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import Category from "./Category";
import AllProducts from "./AllProducts";
import Toolbar from "../tools/Toolbar";

function Shelf() {
  const shopId = useContext(ShopContext);
  const apiEndpoint = configData.apiUrl + "/shop";

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    http
      .get(apiEndpoint + "/" + shopId)
      .then((response) => {
        const data = response.data.shop[0].p_category;
        setCategories(JSON.parse(data));
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Fragment>
      <Toolbar categories={categories}></Toolbar>
      <div>
        {categories &&
          categories.map((category) => (
            <Category key={category} categoryId={category}></Category>
          ))}
        <AllProducts />
      </div>
    </Fragment>
  );
}

export default Shelf;
