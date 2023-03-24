import React, { useState, useEffect, Fragment } from "react";
import "./ProductCard.css";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import { Modal } from "react-bootstrap";
import ProductForm from "./ProductForm";

function ProductCard(props) {
  const apiEndpoint = configData.apiUrl + "/product";
  const apiImage = configData.apiUrl + "/image";
  const productId = props.productId;

  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);

  const getProduct = (productId) => {
    http
      .get(apiEndpoint + "/" + productId)
      .then((response) => {
        const data = response.data.product[0];
        setProduct(data);
        getImage(data.product_image);
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

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (product.availability) {
      setShow(true);
    }
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  const getDisabledStyle = (status) => {
    if (status) {
      return {
        height: "200px",
        width: "200px",
        objectFit: "contain",
      };
    } else {
      return {
        height: "200px",
        width: "200px",
        objectFit: "contain",
        filter: "grayscale(100%)",
      };
    }
  };

  return (
    <Fragment>
      <div
        id="productCard"
        className="card p-4 m-2 rounded-3 d-inline-block shadow-sm position-relative"
        style={{ width: "16rem" }}
        onClick={(e) => handleShow(e)}
      >
        {product && !product.availability && (
          <div
            className="position-absolute top-0 start-0"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
          />
        )}
        <img
          src={image}
          className="card-img-left"
          alt=" "
          style={getDisabledStyle(product.availability)}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.product_name}</h5>
          <p className="card-text" style={{ color: "grey" }}>
            {product.product_description}
          </p>
          <p className="card-text">{product.price}</p>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="productForm"
        scrollable="true"
        backdrop="static"
        size="lg"
        style={{ height: "100%" }}
      >
        <Modal.Body className="p-0">
          <ProductForm
            product={product}
            image={image}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

export default ProductCard;
