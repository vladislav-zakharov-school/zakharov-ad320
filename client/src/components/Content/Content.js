import React from "react";
import "./Content.css";

import Button from "../Button/Button";

function Content() {
  return (
    <div className="content">
      <p>
        Laborum incididunt id et commodo eu quis. Nisi sit non sint consectetur.
        Minim irure non tempor consequat sunt id. Occaecat fugiat ea nulla id
        est tempor do ea sint exercitation. Nostrud culpa do sit aliquip
        adipisicing elit amet consequat sunt aliqua veniam commodo culpa.
      </p>
      <div className="button-bar">
        <Button />
        <Button />
        <Button />
      </div>
    </div>
  );
}

export default Content;
