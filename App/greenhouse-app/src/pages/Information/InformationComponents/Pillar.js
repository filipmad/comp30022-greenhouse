import React from "react";
import { Link } from "react-router-dom";
import "./Pillar.css";

export default function Pillar({ category }) {
  const images = {
    social: "/social.jpg",
    economical: "/economy.jpg",
    environmental: "/environment.jpg",
  };

  return (
    <Link to={`/discover/${category}`} className={`pillar ${category}`}>
      <div className="content">
        <img src={images[category]} alt={`${category} illustration`} className="pillarImage" />
        <div className="categoryLabel">{category.toUpperCase()}</div>
      </div>
    </Link>
  );
}