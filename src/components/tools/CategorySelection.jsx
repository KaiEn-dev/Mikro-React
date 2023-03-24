import React, { Fragment, useState, useEffect, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import ScrollContainer from "react-indiana-drag-scroll";
import configData from "../../config.json";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import ShopContext from "../../context/ShopContext";
import { Modal, ModalBody } from "react-bootstrap";
import { IoMenuOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

function CategorySelection(props) {
  const shopId = useContext(ShopContext);
  const apiEndpoint = configData.apiUrl + "/productCategory/shop";
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const getCategories = () => {
    http
      .get(apiEndpoint + "/" + shopId)
      .then((response) => {
        const data = response.data.categories;
        setCategories(data);
      })
      .catch((error) => toast.error(error));
  };

  const getName = (id) => {
    for (let x of categories)
      if (x.p_category_id == id) return x.p_category_name;
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    categories.length > 0 && (
      <div>
        <button className="btn btn-lg" onClick={handleShow}>
          <IconContext.Provider value={{ color: "black", size: "2.5rem" }}>
            <IoMenuOutline />
          </IconContext.Provider>
        </button>

        <Modal
          className="Modal"
          show={show}
          onHide={handleClose}
          dialogClassName="selection"
          scrollable="true"
          size="lg"
          style={{ height: "45%" }}
        >
          <Modal.Body>
            <div>
              <ul className="list-group mt-1 mb-1">
                {props.categories && (
                  <div>
                    {props.categories.map((category) => (
                      <li
                        key={category}
                        className="list-group-item p-4 fw-bolder fs-6 border-top-0 border-start-0 border-end-0"
                      >
                        <HashLink
                          smooth
                          to={"#category-" + category}
                          scroll={(el) => scrollWithOffset(el)}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                        >
                          <div
                            onClick={handleClose}
                            className="position-absolute top-50 start-50 translate-middle"
                          >
                            {getName(category)}
                          </div>
                        </HashLink>
                      </li>
                    ))}
                  </div>
                )}

                <li
                  key="allproducts"
                  className="list-group-item fw-bolder p-4 fs-6 border-0"
                >
                  <HashLink
                    smooth
                    to={"#allproducts"}
                    scroll={(el) => scrollWithOffset(el)}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <div
                      onClick={handleClose}
                      className="position-absolute top-50 start-50 translate-middle"
                    >
                      All Products
                    </div>
                  </HashLink>
                </li>
              </ul>
            </div>
          </Modal.Body>
          <div
            className="shadow-lg"
            style={{ backgroundColor: "white", height: "1em" }}
          ></div>
        </Modal>
      </div>
    )
  );
}

export default CategorySelection;
