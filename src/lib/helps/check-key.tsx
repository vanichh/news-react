import { KEY_API } from "lib/constants";
import React from "react";


export const checkKeyApi = () => {
  if (!KEY_API) {
    return <div></div>;
  }
};
