import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

//////////////////////////
//      BUBBLE PAGE     //
//////////////////////////

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [newColor, setNewColor] = useState([]);

  /////////////////////////
  //      FETCH DATA     //
  /////////////////////////

  const getColors = () => {
    axiosWithAuth()
      .get(`/api/colors`)
      .then((res) => {
        setColorList(res.data);
      })
      .catch((error) => {
        console.log("Error retrieving data");
      });
  };

  useEffect(() => {
    getColors();
  }, []);

  //////////////////////////
  //      RENDER DATA     //
  //////////////////////////

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getColors={getColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
