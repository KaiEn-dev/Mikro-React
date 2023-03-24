import React, { useState, useEffect, Fragment } from "react";
import "./ProductCard.css";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import { Modal } from "react-bootstrap";
import ProductForm from "./ProductForm";

function HorizontalProductCard(props) {
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
    setShow(true);
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  return (
    <Fragment>
      <div
        id="productCard"
        className="card mb-3 shadow-sm"
        style={{ maxWidth: "100%" }}
        onClick={(e) => handleShow(e)}
      >
        <div className="row g-1">
          <div className="col-md-3">
            <img
              src={image}
              className="img-fluid rounded-start m-2"
              alt=""
              style={{ height: "150px", width: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product.product_name}</h5>
              <p className="card-text" style={{ color: "grey" }}>
                {product.product_description}
              </p>
              <p className="card-text">{product.price}</p>
            </div>
          </div>
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

export default HorizontalProductCard;
