import React from "react";
import "./Information.css";
import Pillar from "./InformationComponents/Pillar";


export default function Information() {
  return (
	<div className="informationPage">
	  <Pillar category="social"/>
	  <Pillar category="economical"/>
	  <Pillar category="environmental"/>
	</div>
  );
}