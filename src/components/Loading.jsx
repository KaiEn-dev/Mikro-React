import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import loadinglogo from "../media/loadinglogo.PNG";
import { Line } from "rc-progress";

function Loading(props) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (progress == 100) {
        handleClose();
      }
      setProgress(progress + 1);
    }, 30);
  });

  return (
    <Modal
      centered
      show={show}
      fullscreen={true}
      onHide={handleClose}
      dialogClassName="productForm"
      scrollable="true"
      backdrop="static"
      size="lg"
      style={{ height: "100%", width: "100%" }}
    >
      <Modal.Body
        className="position-relative"
        style={{ backgroundColor: "#2B342D" }}
      >
        <div className="position-absolute top-50 start-50 translate-middle">
          <div>
            <img src={loadinglogo} style={{ width: "25em" }}></img>
            <div className="d-flex justify-content-center">
              <div style={{ width: "12em" }}>
                <Line
                  percent={progress}
                  strokeWidth="2"
                  strokeColor="white"
                  trailWidth="2"
                  trailColor="#8F8F8F"
                />
              </div>
            </div>
          </div>
          <div style={{ height: "13em" }}></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Loading;
