import React from "react";
import "./Home.css";
import PrimaryBox from "./HomeComponents/PrimaryBox/PrimaryBox";

export default function Home() {
  return (
    <div className="mainContent">
      <div className="leftButtons">
        <PrimaryBox page="Information" />
        <PrimaryBox page="Community" />
        <div className="trendingHomeItems">
          <div className="trendingHomeItem">
            <h2>Trending Item 1</h2>
          </div>
          <div className="trendingHomeItem">
            <h2>Trending Item 2</h2>
          </div>
        </div>
      </div>
      <div className="rightButtons">
        <div className="smallButtonsContainer">
          <PrimaryBox page="WordExplorer" />  
          <PrimaryBox page="Games" />
        </div>
        <PrimaryBox page="Garden" />
      </div>
    </div>
  );
}
