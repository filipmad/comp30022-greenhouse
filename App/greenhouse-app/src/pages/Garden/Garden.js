import React from 'react';

const GameComponent = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/GardenGame/index.html`}
        width="1067"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default function Garden() {
  return (
	<div>
		<h1>Garden</h1>
	  <GameComponent />
	</div>
  );
}
