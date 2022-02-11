import React from "react";
import "./Content.css";
import Card from "../Card/Card";
import Navigation from "../Navigation/Navigation";

function Content() {
  return (
    <div className="content">
      <Card />
      <Navigation />
    </div>
  );
}

export default Content;
