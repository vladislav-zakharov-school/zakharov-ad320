import React from "react";
import "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Page from "./components/Page/Page";

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <Page />
    </React.Fragment>
  );
}

export default App;
