import React, { useEffect, useState, useRef } from "react";
import Icon from '@mdi/react';
import { mdiPlus, mdiMinus } from '@mdi/js';


export default function WaldoImage() {
  const [ imageError, setImageError ] = useState(false);
  const [ imagePath, setImagePath ] = useState(null);

  const imageRef = useRef(null);

  // zooming functionnality
  const [ scale, setScale ] = useState(1);
  const [ position, setPosition ] = useState({ x: 0, y: 0 });

  function handleZoom(direction) {
    if (direction === "in") {
      setScale(scale => scale + 0.1);
    }
    if (direction === "out" && scale > 1) {
      setScale(scale => scale - 0.1);
    }
  }

  // fetching the image
  useEffect(() => {
    const url = '/api/images/waldo';
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setImageError(true);
      })
      .then((response) => {
        setImagePath(response.image_path);
      } );
  }, []);

  //handling image dragging
  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0};

    function handleMouseDown(e) {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    }

    function handleMouseMove(e) {
      if (!isDragging) {
        return;
      } else {
        const deltaX = e.clientX - prevPosition.x;
        const deltaY = e.clientY - prevPosition.y;
        prevPosition = { x: e.clientX, y: e.clientY }
        setPosition((position) => ({
          x: position.x + deltaX,
          y: position.y + deltaY,
        }));
        
      }
    }

    function handleMouseUp() {
      isDragging = false;
    }

    function handleImageClick(e) {
      console.log(`x: ${e.offsetX}`);
      console.log(`y: ${e.offsetY}`)
    }

    image?.addEventListener("click", handleImageClick);
    image?.addEventListener("mousedown", handleMouseDown);
    image?.addEventListener("mousemove", handleMouseMove);
    image?.addEventListener("mouseup", handleMouseUp);

    return () => {
      image?.removeEventListener("click", handleImageClick);
      image?.removeEventListener("mousedown", handleMouseDown);
      image?.removeEventListener("mousemove", handleMouseMove);
      image?.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (imageError) {
    return <p className="error">The image couln't be loaded please try to reload the page</p>
  }
  
  return (
    <div className="image-container">
      <div className="btn-container">
        <button className="zoom" onClick={() => handleZoom("in")}>
          <Icon path={mdiPlus} size={1}/>
        </button>

        <button className="zoom" onClick={() => handleZoom("out")}>
        <Icon path={mdiMinus} size={1} />
        </button>
      </div>
      <img
        ref={imageRef}
        draggable="false"
        className="waldo" 
        src={imagePath} 
        alt="image with a lot of characters"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  )
}