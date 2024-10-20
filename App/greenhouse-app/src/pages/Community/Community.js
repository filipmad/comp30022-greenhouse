import React from "react";
import "./Community.css";

export default function Community() {
	return (
	  <div className="community-container">
		<div className="section polls">
		  <h2>Polls</h2>
		  <div className="element">Poll 1</div>
		  <div className="element">Poll 2</div>
		  <div className="element">Poll 3</div>
		</div>
		<div className="section posts">
		  <h2>Top Posts</h2>
		  <div className="element">Post 1</div>
		  <div className="element">Post 2</div>
		  <div className="element">Post 3</div>
		</div>
		<div className="section milestones">
		  <h2>Milestones</h2>
		  <div className="element">Milestone 1</div>
		  <div className="element">Milestone 2</div>
		  <div className="element">Milestone 3</div>
		</div>
	  </div>
	);
  }