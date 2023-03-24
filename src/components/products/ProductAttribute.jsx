import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import AttributeSelection from "./AttributeSelection";

function ProductAttribute({
  paId,
  addPrice,
  fullComplete,
  setFullComplete,
  fullSelection,
  setFullSelection,
  n,
}) {
  const apiEndpoint = configData.apiUrl + "/attributeCategory";
  const [attCategory, setAttCategory] = useState();
  const [complete, setComplete] = useState(false);
  const [selection, setSelection] = useState([]);

  const getAttCategories = (id) => {
    http
      .get(apiEndpoint + "/" + id)
      .then((response) => {
        const data = response.data.attributeCategory[0];
        setAttCategory(data);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    getAttCategories(paId);
  }, []);

  // init
  useEffect(() => {
    if (attCategory) {
      let newSelect = {
        id: attCategory.a_category_id,
        name: attCategory.a_category_name,
        selection: [],
      };
      let newFS = fullSelection.slice();
      newFS = newFS.concat(newSelect);
      let count = newFS.length;
      let sortedFS = [];
      if (count > 1) {
        let smallestItem;
        let smallestIndex;
        for (let i = 0; i < count; i++) {
          smallestItem = newFS[0];
          smallestIndex = 0;
          let index = 0;
          for (let item of newFS) {
            if (smallestItem.id > item.id) {
              smallestItem = item;
              smallestIndex = index;
            }
            index++;
          }
          newFS.splice(smallestIndex, 1);
          sortedFS = sortedFS.concat(smallestItem);
        }
      } else {
        sortedFS = newFS;
      }
      setFullSelection(sortedFS);
    }
  }, [attCategory]);

  useEffect(() => {
    if (attCategory) {
      if (fullComplete.length == n && fullSelection.length == n) {
        let newComplete = {
          id: attCategory.a_category_id,
          completion: complete,
        };
        let newSelect = {
          id: attCategory.a_category_id,
          name: attCategory.a_category_name,
          selection: selection,
        };
        let FC = fullComplete.slice();
        let FS = fullSelection.slice();

        let counter = 0;

        // get index of target
        let FCindex = null;
        for (let e of FC) {
          if (e.id == attCategory.a_category_id) {
            FCindex = counter;
          }
          counter++;
        }

        // get index of target
        counter = 0;
        let FSindex = null;
        for (let e of FS) {
          if (e.id == attCategory.a_category_id) {
            FSindex = counter;
          }
          counter++;
        }
        FC[FCindex] = newComplete;
        FS[FSindex] = newSelect;
        setFullComplete(FC);
        setFullSelection(FS);
      }
    }
  }, [selection, complete]);

  const getOptionalInfo = (ac) => {
    if (ac) {
      if (ac.optional == 1) {
        return "optional ";
      }
      if (ac.optional == 0) {
        return "";
      }
    }
  };

  const getSelectionInfo = (ac) => {
    if (ac) {
      if (ac.maximum == 0) {
        return "";
      } else if (ac.maximum == 1) {
        return "pick 1";
      } else if (ac.minimum == ac.maximum) {
        return `pick ${ac.minimum}`;
      } else if (ac.minimum > 1) {
        return `pick ${ac.minimum} to ${ac.maximum}`;
      } else {
        return `pick max ${ac.maximum}`;
      }
    }
  };

  const displayAttributes = (ac) => {
    if (ac) {
      return (
        <div className="m-2 rounded" style={{ backgroundColor: "#F3F3F3" }}>
          <div className="d-flex justify-content-between p-3">
            <h5>{ac.a_category_name}</h5>
            <p className="pe-1" style={{ color: "grey" }}>
              {getOptionalInfo(ac)}
              {getSelectionInfo(ac)}
            </p>
          </div>
          <AttributeSelection
            ac={ac}
            setComplete={setComplete}
            addPrice={addPrice}
            selection={selection}
            setSelection={setSelection}
            fullComplete={fullComplete}
            setFullComplete={setFullComplete}
          />
        </div>
      );
    }
  };

  return <div>{displayAttributes(attCategory)}</div>;
}

export default ProductAttribute;
