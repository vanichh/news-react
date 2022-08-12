/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const UseLoadImg = (url: string, imgDefaut: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>(imgDefaut);
  const [error, setError] = useState<boolean>(false);

  const img = new Image();

  const handlerLoad = () => {
    setIsLoading(false);
    setImage(url);
  };

  const handlerError = () => {
    setIsLoading(false);
    setError(true);
  };
  useEffect(() => {
    img.addEventListener("load", handlerLoad);
    img.addEventListener("error", handlerError);
    img.src = url;
    return () => {
      img.removeEventListener("load", handlerLoad);
      img.removeEventListener("error", handlerError);
    };
  }, []);

  return { isLoading, image, error };
};
