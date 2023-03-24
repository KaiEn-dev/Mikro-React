import Store from "./components/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Route path="/shop/:id" component={Store} />
    </React.Fragment>
  );
}

export default App;
