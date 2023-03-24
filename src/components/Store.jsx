import React, { useState, Fragment } from "react";
import ShopSign from "./profile/ShopSign";
import ShopContext from "../context/ShopContext";
import DeliveryContext from "../context/DeliveryContext";
import CartContext from "../context/CartContext";
import PaymentContext from "../context/PaymentContext";
import CustomerContext from "../context/CustomerContext";
import StatusContext from "../context/StatusContext";
import Shelf from "./shelves/Shelf";
import Footer from "./tools/Footer";
import DeliveryInfo from "./delivery/DeliveryInfo";
import Cart from "./cart/Cart";
import Loading from "./Loading";

function Store(props) {
  const [storeId, setStoreId] = useState(props.match.params.id);
  const [storeStatus, setStoreStatus] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
  });

  return (
    <Fragment>
      <div>
        <ShopContext.Provider value={storeId}>
          <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo }}>
            <CartContext.Provider value={{ cart, setCart }}>
              <PaymentContext.Provider value={{ payment, setPayment }}>
                <CustomerContext.Provider
                  value={{ customerInfo, setCustomerInfo }}
                >
                  <StatusContext.Provider
                    value={{ storeStatus, setStoreStatus }}
                  >
                    <Loading />
                    {storeStatus == 0 && (
                      <div
                        className="d-flex justify-content-center p-2 sticky-top"
                        style={{
                          backgroundColor: "#2B342D",
                          color: "#fff",
                        }}
                      >
                        <h6 className="m-0">- shop closed -</h6>
                      </div>
                    )}
                    <ShopSign />
                    <DeliveryInfo />
                    <Shelf />
                    <Cart />
                    <Footer />
                  </StatusContext.Provider>
                </CustomerContext.Provider>
              </PaymentContext.Provider>
            </CartContext.Provider>
          </DeliveryContext.Provider>
        </ShopContext.Provider>
      </div>
    </Fragment>
  );
}

export default Store;
