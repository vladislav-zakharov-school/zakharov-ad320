import React from "react";
import "./Navigation.css";
import Button from "../Button/Button";

function Navigation() {
  return (
    <div className="navigation">
      <Button text="Back" />
      <Button text="Flip" />
      <Button text="Next" />
    </div>
  );
}

export default Navigation;
