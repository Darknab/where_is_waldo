import React, { useEffect, useState, useRef } from "react";
//import Icon from '@mdi/react';
//import { mdiPlus, mdiMinus } from '@mdi/js';


export default function WaldoImage() {
  const [ imageError, setImageError ] = useState(false);
  const [ imagePath, setImagePath ] = useState(null);

  const [ charactersCoords, setCharacterCoords ] = useState([]);
  /*const charactersCoords = [
    [ 190, 950, 215, 1020 ],
    [ 1410, 720, 1520, 870 ],
    [ 1490, 210, 1550, 340 ],
  ];*/

  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  /*
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
  }*/

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

  useEffect(() => {
    const container = containerRef.current;

    function calculateCoordinates() {
      const delta = {
        x: 1920 / container.clientWidth,
        y: 1080 / container.clientHeight
      };
      
      const coords = [
        [ 190 / delta.x, 950 / delta.y, 215 / delta.x, 1020 / delta.y ],
        [ 1410 / delta.x, 720 / delta.y, 1520 / delta.x, 870 / delta.y ],
        [ 1490 / delta.x, 210 / delta.y, 1550 / delta.x, 340 / delta.y ],
      ];
  
      const formattedCoords = coords.map(element => {
        return element.map(value => {
          return parseInt(value);
        });
      });
      setCharacterCoords(formattedCoords);
    };

    calculateCoordinates();

    window.addEventListener('resize', calculateCoordinates);

    return () => {
      window.removeEventListener('resize', calculateCoordinates);
    }
  }, []);
  /*
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
        console.log
        if (charactersCoords.length > 0) {
          const newCoords = charactersCoords.map(element => [
            element[0] + deltaX,
            element[1] + deltaY,
            element[2] + deltaX,
            element[3] + deltaY,
          ]);
          
          setCharacterCoords(newCoords);
        }
        
      }
    }

    function handleMouseUp() {
      isDragging = false;
    }

    function handleImageClick(e) {
      console.log(`dimensions: ${image.clientWidth} / ${image.clientHeight}`)
      const delta = {
        x: 1920 / image.clientWidth,
        y: 1080 / image.clientHeight
      };
      const clickedPosition = { 
        x: parseInt(e.offsetX * delta.x),
        y: parseInt(e.offsetY * delta.y)
      }
      console.log(clickedPosition)
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
 */
  if (imageError) {
    return <p className="error">The image couln't be loaded please try to reload the page</p>
  }
  
  return (
    <div className="image-container" ref={containerRef}>
      {charactersCoords.length > 0 && (
        <>
          <div 
            className="character"
            onClick={() => console.log("clicked!")}
            id="ch-1"
            style={{
              left: charactersCoords[0][0],
              top: charactersCoords[0][1],
              width: charactersCoords[0][2] - charactersCoords[0][0],
              height: charactersCoords[0][3] - charactersCoords[0][1],
            }}
          ></div>
          <div 
            className="character"
            onClick={() => console.log("clicked!")}
            id="ch-2"
            style={{
              left: charactersCoords[1][0],
              top: charactersCoords[1][1],
              width: charactersCoords[1][2] - charactersCoords[1][0],
              height: charactersCoords[1][3] - charactersCoords[1][1],
            }}
          ></div>
          <div 
          className="character" 
          id="ch-3"
          onClick={() => console.log("clicked!")}
          style={{
            left: charactersCoords[2][0],
            top: charactersCoords[2][1],
            width: charactersCoords[2][2] - charactersCoords[2][0],
            height: charactersCoords[2][3] - charactersCoords[2][1],
          }}
        ></div>
        </>
      )}

      {/*<div className="btn-container">
        <button className="zoom" onClick={() => handleZoom("in")}>
          <Icon path={mdiPlus} size={1}/>
        </button>
        <button className="zoom" onClick={() => handleZoom("out")}>
        <Icon path={mdiMinus} size={1} />
        </button>
      </div>*/}
      <img
        ref={imageRef}
        draggable="false"
        className="waldo" 
        src={imagePath} 
        alt="image with a lot of characters"
        style={{
          //transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  )
}