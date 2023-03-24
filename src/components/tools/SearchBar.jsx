import React, { Fragment, useState, useEffect, useContext } from "react";
import ShopContext from "../../context/ShopContext";
import configData from "../../config.json";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import { Modal } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import SearchResult from "./SearchResult";

function SearchBar() {
  const shopId = useContext(ShopContext);
  const apiEndpoint = configData.apiUrl + "/product/shop";

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");

  const getProducts = () => {
    http
      .get(apiEndpoint + "/" + shopId)
      .then((response) => {
        const data = response.data.products;
        setProducts(data);
      })
      .catch((error) => toast.error(error));
  };

  const handleClose = () => {
    setShow(false);
    setQuery("");
  };

  const handleShow = () => setShow(true);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const showSearch = () => {
    let filtered = [];

    if (query)
      filtered = products.filter((p) =>
        p.product_name.toLowerCase().includes(query.toLowerCase())
      );
    return filtered;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <button
          style={{ backgroundColor: "#F3F3F3" }}
          className="btn btn-lg me-3 position-absolute top-50 end-0 translate-middle-y"
          onClick={handleShow}
        >
          Search
          <BiSearch className="ms-5" />
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          dialogClassName="searchbox"
          scrollable="true"
          size="lg"
          style={{ height: "100%" }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Header className="shadow-sm" style={{ borderBottom: "0" }}>
            <input
              className="form-control mt-2 mb-3 sticky-top"
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => handleSearch(e.currentTarget.value)}
            />
          </Modal.Header>
          <Modal.Body>
            <SearchResult result={showSearch()} />
          </Modal.Body>
          <div
            className="shadow-lg"
            style={{ height: "1em", backgroundColor: "white" }}
          ></div>
        </Modal>
      </div>
    </Fragment>
  );
}

export default SearchBar;
