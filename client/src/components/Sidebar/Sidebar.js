import React from 'react';
import './Sidebar.css';

const cardLinks = [
    "Card A",
    "Card B",
    "Card C",
    "Card D",
    "Card E",
    "Card F",
    "Card G",
  ];

function Sidebar() {
    return (
        <div className="sidebar">
        <ul>
          {cardLinks.map((link) => {
            return <li>{link}</li>;
          })}
        </ul>
      </div>
    );
}

export default Sidebar;