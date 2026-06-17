import React, { useEffect, useState } from "react";

function useImageLoaded(
  imageUrl: string,
  containerRef: React.RefObject<HTMLDivElement | null>
): [isImageLoaded: boolean] {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const imageURL = imageUrl;
    const image = new Image();
    image.src = imageURL;

    image.onload = () => {
      setIsImageLoaded(true);
      if (containerRef.current)
        containerRef.current.style.backgroundImage = `url(${imageURL})`;
    };
  });
  return [isImageLoaded];
}

export default useImageLoaded;
