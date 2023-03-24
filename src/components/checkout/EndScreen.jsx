import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import loadinglogo from "../../media/loadinglogo.PNG";
import { Line } from "rc-progress";
import { IconContext } from "react-icons";
import { IoIosSend } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

function EndScreen(props) {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleClose = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (progress == 100) {
        setDone(true);
      }
      setProgress(progress + 1);
    }, 70);
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
        {!done && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div>
              <img src={loadinglogo} style={{ width: "15em" }}></img>
              <div className="d-flex justify-content-center mt-3">
                <h6 className="me-2" style={{ color: "#bec4aa" }}>
                  Sending order
                </h6>
                <IconContext.Provider value={{ size: "1.5em", color: "white" }}>
                  <IoIosSend />
                </IconContext.Provider>
              </div>
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
        )}
        {done && (
          <div>
            <button
              className="btn p-0 m-2 position-absolute top-0 end-0"
              onClick={(e) => handleClose()}
            >
              <IconContext.Provider value={{ size: "2.2em", color: "white" }}>
                <IoCloseOutline id="closecart" />
              </IconContext.Provider>
            </button>
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="d-flex justify-content-center">
                <img src={loadinglogo} style={{ width: "15em" }}></img>
              </div>
              <div>
                <div className="d-flex justify-content-center mt-4 mb-3">
                  <IconContext.Provider
                    value={{ size: "1.2em", color: "#f9fafd" }}
                  >
                    <BsCheckCircleFill />
                  </IconContext.Provider>
                </div>
                <h6
                  className="me-2 text-center mb-3"
                  style={{ color: "#e7f0df" }}
                >
                  Thank you for your purchase.
                </h6>
                <p className="me-2 text-center" style={{ color: "#bec4aa" }}>
                  A confirmation email will be sent to you shortly.
                </p>
              </div>
              <div style={{ height: "13em" }}></div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EndScreen;
