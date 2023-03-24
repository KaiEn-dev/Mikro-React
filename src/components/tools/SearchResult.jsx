import React, { Fragment } from "react";
import HorizontalProductCard from "../products/HorizontalProductCard";

function SearchResult(props) {
  return (
    <Fragment>
      {props.result.map((product) => (
        <HorizontalProductCard
          key={product.product_id}
          productId={product.product_id}
        />
      ))}
    </Fragment>
  );
}

export default SearchResult;
