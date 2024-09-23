import React from "react";
import "./Home.css";
import PrimaryBox from "./HomeComponents/PrimaryBox/PrimaryBox";

export default function Home() {
  return (
    <div className="mainContent">
      <div className="leftButtons">
        <PrimaryBox page="Information" />
        <PrimaryBox page="Community" />
        <PrimaryBox page="News" />
      </div>
      <div className="rightButtons">
        <div className="smallButtonsContainer">
          <PrimaryBox page="WordExplorer" />  {/* Ensure WordExplorer matches */}
          <PrimaryBox page="Games" />
        </div>
        <PrimaryBox page="Garden" />
      </div>
    </div>
  );
}
