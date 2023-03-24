import React, { useState, useEffect, Fragment, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import ProductCard from "../products/ProductCard";
import "./scrollbar.css";

function Category(props) {
  const apiEndpoint = configData.apiUrl + "/productCategory";
  const categoryId = props.categoryId;

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  const getCategory = (categoryId) => {
    http
      .get(apiEndpoint + "/" + categoryId)
      .then((response) => {
        const data = response.data.productCategory[0];
        setCategory(data);
        setProducts(JSON.parse(data.products));
      })
      .catch((error) => toast.error(error));
  };
  useEffect(() => {
    getCategory(categoryId);
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-5">
        <h2 id={"category-" + categoryId}>{category.p_category_name}</h2>
        {products && (
          <ScrollContainer className="scroll-container row flex-row flex-nowrap overflow-auto mt-2">
            {products.map((product) => (
              <ProductCard key={product} productId={product} />
            ))}
          </ScrollContainer>
        )}
      </div>
    </Fragment>
  );
}

export default Category;
