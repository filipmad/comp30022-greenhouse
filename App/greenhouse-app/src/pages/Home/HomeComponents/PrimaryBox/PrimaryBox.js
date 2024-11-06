import React from "react";
import { Link } from "react-router-dom";
import "./PrimaryBox.css";

export default function PrimaryBox({ page }) {
  let text;
  let linkTo;
  let className;

  if (page === "WordExplorer") {
    text = "Word Explorer";  
    linkTo = "/games/WordExplorer"; 
    className = "wordExplorerBox"; 
  }
  else if (page === "Games") {
    text = "Play Games";
    linkTo = "/games";
    className = "gamesBox";
  } 
  else if (page === "Garden") {
    text = "Check the news";
    linkTo = "/news";
    className = "gardenBox";
  }
  else if (page === "Community") {
    text = "Community";
    linkTo = "/community";
    className = "communityBox";
  }
  else if (page === "Information") {
    text = "Discover The SDGs";
    linkTo = "/discover";
    className = "informationBox";
  }

  return (
    <Link to={linkTo} className={className}>
      <div>
        <h1>{text}</h1>
      </div>
    </Link>
  );
}
