import { useEffect, useState } from "react";

export const UseLoadImg = (url: string, imgError: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<string>(imgError);
  const [error, setError] = useState<boolean>(false);

  const img = new Image();

  const handlerLoad = () => {
    setLoading(false);
    setImage(url);
  };

  const handlerError = (e: Event) => {
    console.dir(e);
    setLoading(false);
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

  return { loading, image, error };
};
