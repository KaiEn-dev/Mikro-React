import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import http from "../../services/httpService";
import configData from "../../config.json";
import Attribute from "./Attribute";
import { IoOptionsSharp } from "react-icons/io5";

function AttributeSelection({
  ac,
  setComplete,
  addPrice,
  selection,
  setSelection,
  fullComplete,
  setFullComplete,
}) {
  const checkSelection = (newSelectionId, newSelectionName) => {
    let idList = [];
    let newData = [];

    for (let item of selection) {
      idList = idList.concat(item.id);
    }

    //if deselect
    if (idList.includes(newSelectionId)) {
      let index = idList.indexOf(newSelectionId);
      newData = selection.slice();
      newData.splice(index, 1);
    } else {
      // if select
      // if optional
      if (ac.optional == 1) {
        //if pick 1
        if (ac.maximum == 1) {
          newData = newData.concat({
            id: newSelectionId,
            name: newSelectionName,
          });
        }
        // if pick any
        else if (ac.maximum == 0) {
          newData = selection.concat({
            id: newSelectionId,
            name: newSelectionName,
          });
        }
        // if pick within range
        else {
          if (selection.length == ac.maximum) {
            newData = selection;
          } else {
            newData = selection.concat({
              id: newSelectionId,
              name: newSelectionName,
            });
          }
        }
      }
      // if not optional
      if (ac.optional == 0) {
        // if pick 1
        if (ac.maximum == 1) {
          newData = newData.concat({
            id: newSelectionId,
            name: newSelectionName,
          });
        }
        // if pick any
        else if (ac.maximum == 0) {
          newData = selection.concat({
            id: newSelectionId,
            name: newSelectionName,
          });
        }
        // if pick within range
        else {
          if (selection.length == ac.maximum) {
            newData = selection;
          } else {
            newData = selection.concat({
              id: newSelectionId,
              name: newSelectionName,
            });
          }
        }
      }
    }
    checkCompletion(newData.length);

    let count = newData.length;
    let sortedData = [];
    if (count > 1) {
      let smallestItem;
      let smallestIndex;
      for (let i = 0; i < count; i++) {
        smallestItem = newData[0];
        smallestIndex = 0;
        let index = 0;
        for (let item of newData) {
          if (smallestItem.id > item.id) {
            smallestItem = item;
            smallestIndex = index;
          }
          index++;
        }
        newData.splice(smallestIndex, 1);
        sortedData = sortedData.concat(smallestItem);
      }
    } else {
      sortedData = newData;
    }

    setSelection(sortedData);
  };

  const checkCompletion = (n) => {
    let newData;

    // if optional
    if (ac.optional == 1) {
      newData = true;
    }
    // if not optional
    if (ac.optional == 0) {
      // if pick 1
      if (ac.maximum == 1) {
        if (n == 1) {
          newData = true;
        }
        if (n == 0) {
          newData = false;
        }
      }
      // if pick any
      else if (ac.maximum == 0) {
        if (n > 0) {
          newData = true;
        } else {
          newData = false;
        }
      } else {
        if (n >= ac.minimum) {
          newData = true;
        } else {
          newData = false;
        }
      }
    }
    setComplete(newData);
  };

  useEffect(() => {
    let x = false;

    if (ac.optional == 1) {
      x = true;
      setComplete(true);
    }
    let newComplete = { id: ac.a_category_id, completion: x };
    let oldFC = fullComplete.slice();
    setFullComplete(oldFC.concat(newComplete));
  }, []);

  return (
    <div className="p-3 pt-0">
      {JSON.parse(ac.attributes).map((id) => {
        return (
          <Attribute
            key={id}
            attributeId={id}
            selection={selection}
            checkSelection={checkSelection}
            addPrice={addPrice}
          />
        );
      })}
    </div>
  );
}

export default AttributeSelection;
