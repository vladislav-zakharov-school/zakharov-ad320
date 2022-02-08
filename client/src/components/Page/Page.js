import React from "react";
import "./Page.css";
import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

function Page() {
  return (
    <div className="page">
        <Sidebar />
        <Content />
    </div>
  );
}
export default Page;
