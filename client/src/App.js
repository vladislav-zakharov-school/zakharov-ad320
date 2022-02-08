import React from "react";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Card from "./components/Card/Card"
import Button from "./components/Button/Button"

const cardLinks = ['Card A', 'Card B', 'Card C', 'Card D', 'Card E', 'Card F', 'Card G']

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="page">
        <div className="sidebar">
          <ul>
            {cardLinks.map((link) => {
              return (<li>{link}</li>);
            })}
          </ul>
        </div>
        <div className="content">
          <Card />
          <div className="navigation">
            <Button text="Back"/>
            <Button text="Flip"/>
            <Button text="Next"/>
          </div>
        </div>
        <div className="sidebar">
          <p>hello there</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
