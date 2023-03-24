import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";

function Attribute({ attributeId, selection, checkSelection, addPrice }) {
  const apiEndpoint = configData.apiUrl + "/attribute";
  const [attribute, setAttribute] = useState(null);

  const getAttribute = (attributeId) => {
    http
      .get(apiEndpoint + "/" + attributeId)
      .then((response) => {
        const data = response.data.attribute[0];
        let newPrice = { id: data.a_id, charge: data.charge };
        addPrice(newPrice);
        setAttribute(data);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getAttribute(attributeId);
  }, []);

  const getCharge = (charge) => {
    if (charge == 0) return "";
    if (charge > 0) return `+${charge}`;
    if (charge < 0) return `-${Math.abs(charge)}`;
  };

  const getStyle = (selection) => {
    let idList = [];
    for (let item of selection) {
      idList = idList.concat(item.id);
    }

    if (attribute.availability == 0) {
      return { width: "100%", backgroundColor: "white", color: "#A5A5A5" };
    }

    if (idList.includes(attributeId)) {
      return {
        width: "100%",
        backgroundColor: "#8A907A",
        fontWeight: "bold",
        color: "white",
      };
    } else {
      return { width: "100%", backgroundColor: "white" };
    }
  };

  const handleSelect = () => {
    if (attribute.availability == 1) {
      checkSelection(attribute.a_id, attribute.a_name);
    }
  };

  return (
    <div>
      {attribute && (
        <button
          className="btn d-flex justify-content-between mb-2 p-2 ps-3 pe-3"
          style={getStyle(selection)}
          onClick={(e) => handleSelect()}
        >
          {attribute.a_name}
          <p className="m-0">{getCharge(attribute.charge)}</p>
        </button>
      )}
    </div>
  );
}

export default Attribute;
