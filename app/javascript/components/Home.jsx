import React, { useEffect, useState } from "react";

export default () => {
  const [ imageError, setImageError ] = useState(false);
  const [ imagePath, setImagePath ] = useState(null)

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
        console.log(`image path: ${response.image_path}`)
      } );
  }, [])

  return (
    <main>
      <h1>Where's Waldo?</h1>
      <p>Can you find <span>Waldo</span>, <span>The clown</span>, and <span>The centaur</span> in the image below?</p>
      {imageError 
        ? <p className="error">The image couln't be loaded please try to reload the page</p>
        : <img src={imagePath} alt="image with a lot of characters" />
        
      }
    </main>
);
  
}