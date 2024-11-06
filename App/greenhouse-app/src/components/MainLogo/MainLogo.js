import React from 'react';
import './MainLogo.css';

export default function MainLogo() {
    return(
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/image.png`} alt="Logo" />
      </div>
    )
  }