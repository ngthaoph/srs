import { SRSButton } from "./SRSButton.css";
import React from "react";
const Button = ({ children, onClick }) => {
  return <SRSButton onClick={onClick}>{children}</SRSButton>;
};

export default Button;
