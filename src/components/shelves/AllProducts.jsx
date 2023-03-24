import React, { Fragment, useState, useEffect, useContext } from "react";
import ShopContext from "../../context/ShopContext";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import ScrollContainer from "react-indiana-drag-scroll";
import ProductCard from "../products/ProductCard";

function AllProducts() {
  const shopId = useContext(ShopContext);
  const apiEndpoint = configData.apiUrl + "/product/shop";

  const [products, setProducts] = useState([]);

  const products1 = products.filter((v, i) => i % 2);
  const products2 = products.filter((v, i) => !(i % 2));

  const getProducts = () => {
    http
      .get(apiEndpoint + "/" + shopId)
      .then((response) => {
        const data = response.data.products;
        setProducts(data);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid mt-5">
        <h2 id="allproducts">All Products</h2>
        <div className="col-sm">
          <ScrollContainer className="row flex-row flex-nowrap overflow-auto">
            {products1.map((product) => (
              <ProductCard
                key={product.product_id}
                productId={product.product_id}
              />
            ))}
          </ScrollContainer>
          <ScrollContainer className="row flex-row flex-nowrap overflow-auto">
            {products2.map((product) => (
              <ProductCard
                key={product.product_id}
                productId={product.product_id}
              />
            ))}
          </ScrollContainer>
        </div>
      </div>
    </Fragment>
  );
}

export default AllProducts;
