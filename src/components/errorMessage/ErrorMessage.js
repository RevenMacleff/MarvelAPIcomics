import React from "react";
import img from "./error.gif";
const ErrorMessage = () => {
  return (
    <img
      alt="Error"
      src={img}
      style={{
        display: "block",
        margin: "0 auto",
        height: "250px",
        width: "250px",
        objectFit: "contain",
      }}
    />
  );
};

export default ErrorMessage;
