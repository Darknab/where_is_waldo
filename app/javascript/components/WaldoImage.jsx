import React, { useEffect, useState } from "react";


export default function WaldoImage() {
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
      } );
  }, []);

  if (imageError) {
    return <p className="error">The image couln't be loaded please try to reload the page</p>
  }
  
  return <img src={imagePath} alt="image with a lot of characters" />
}