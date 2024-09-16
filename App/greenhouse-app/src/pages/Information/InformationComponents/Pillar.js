import React from "react";
import { Link } from "react-router-dom";
import "./Pillar.css";

export default function Pillar({ category }) {
	return (
	  <Link to={`/discover/${category}`} className={`pillar ${category}`}>
		<div className="content">
		  {category.toUpperCase()}
		</div>
	  </Link>
	);
  }