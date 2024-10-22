import React from "react";
import { Link } from "react-router-dom";
import "./SettingsSection.css";

function SettingsButton({ type }) {
  let img;
  let link;
  if (type === "search") {
    img = "search.svg";
  } else {
    img = "account.svg";
    link = "/account";
  }

  const button = (
    <button><img src={`${process.env.PUBLIC_URL}/${img}`} alt="Logo" /></button>
  );

  return (
    <div className="settingsButton">
      {type === "account" ? <Link to={link}>{button}</Link> : button}
    </div>
  );
}

export default function SettingsSection() {
  return (
    <div className="settingsSection">
      
      <SettingsButton type="account" />
    </div>
  );
}