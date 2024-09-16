import React from "react";
import "./SettingsSection.css";

function SettingsButton({ type }) {
  let img;
  if (type === "search") {
    img = "search.svg";
  } else {
    img = "account.svg";
  }

  return (
    <div className="settingsButton">
      <button><img src={`${process.env.PUBLIC_URL}/${img}`} alt="Logo" /></button>
    </div>
  );
}

export default function SettingsSection() {
  return (
    <div className="settingsSection">
      <SettingsButton type="search" />
      <SettingsButton type="account" />
    </div>
  );
}