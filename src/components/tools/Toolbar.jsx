import React, { Fragment } from "react";
import CategorySelection from "./CategorySelection";
import SearchBar from "./SearchBar";

function Toolbar(props) {
  return (
    <Fragment>
      <nav
        className="navbar bg-white sticky-top p-2 shadow-sm"
        style={{ zIndex: "1" }}
      >
        <CategorySelection categories={props.categories} />
        <SearchBar></SearchBar>
      </nav>
    </Fragment>
  );
}

export default Toolbar;
