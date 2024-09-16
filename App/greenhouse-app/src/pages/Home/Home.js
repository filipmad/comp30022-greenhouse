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
	  		<PrimaryBox page="Games" />
	  		<PrimaryBox page="Garden" />
		</div>
	</div>
  );
}