import clsx from "clsx";
import React, { useState, useRef, useLayoutEffect } from "react";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getPhotoUrl } from "../../utils/dataUtils";

//Scss of this file is imported in _app file due to global css error of next
/* eslint-disable @next/next/no-img-element */

function ImageSlider ({ images }) {
  const [count, setCount] = useState(1);
  const [blockTrans, setBlockTrans] = useState(true);
  //To hide the slider until initialized and get its width
  const [initialize, setInitialize] = useState(false);
  const sliderRef = useRef();

  useLayoutEffect(function(){
    setInitialize(true);
  }, []);

  function forward(){
    const { length } = images;
    if (count === length + 1) return;
    setCount(count + 1);
    setBlockTrans(false);
  };

  function backword() {
    if (count === 0) return;
    setCount(count - 1);
    setBlockTrans(false);
  };

  function handleEndTransition() {
    const { length } = images;
    if (count === 0) {
      setCount(length);
      setBlockTrans(true);
    } else if (count === length + 1) {
      setCount(1);
      setBlockTrans(true);
    }
  };

  return (
    <div className="slider">
      {images.length < 2 ? (
        <img src={images[0] || getPhotoUrl()} alt="" />
      ) : (
        <>
          <div
            className={clsx("slider-container", blockTrans && "return", !initialize && "hide")}
            ref={sliderRef}
            onTransitionEnd={handleEndTransition}
            style={{ transform: `translateX(-${count * sliderRef.current?.clientWidth}px)` }}
          >
            <img src={images[images.length - 1]}  alt="" />
            {images.map((image, i) => (
              <img src={image} alt="" key={i} />
            ))}
            <img src={images[0]} alt="" />
          </div>
          <AiOutlineArrowLeft className="icon left" onClick={backword}/>
          <AiOutlineArrowRight className="icon right" onClick={forward}/>
        </>
      )}
    </div>
  );

}

export default ImageSlider;
