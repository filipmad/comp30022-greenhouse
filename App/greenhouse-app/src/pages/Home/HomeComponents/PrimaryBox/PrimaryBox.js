import React from "react";
import { Link } from "react-router-dom";
import "./PrimaryBox.css";

export default function PrimaryBox({ page }) {
  let text;
  let linkTo;
  let className;

  if (page === "Games") {
    text = "Play Games";
    linkTo = "/games";
    className = "gamesBox";
  } 
  else if (page === "Garden") {
    text = "Grow Your Garden";
    linkTo = "/grow";
    className = "gardenBox";
  }
  else if (page === "Community") {
	text = "Community";
	linkTo = "/community";
	className = "communityBox";
  }
  else if (page === "News") {
	text = "News";
	linkTo = "/news";
	className = "newsBox";
  }
  else if (page === "Information") {
	text = "Discover The SDGs";
	linkTo = "/discover";
	className = "informationBox";
  }
  else {
	text = "Error";
	linkTo = "/";
	className = "errorBox";
  }

  return (
    <Link to={linkTo} className={className}>
      <div>
        <h1>{text}</h1>
      </div>
    </Link>
  );
}