import React from "react";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Card from "./components/Card/Card"
import Button from "./components/Button/Button"


function App() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="page">
        <div className="sidebar">
          <p>hello there</p>
        </div>
        <div className="content">
          <Card />
          <div className="navigation">
            <Button />
            <Button />
            <Button />
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
