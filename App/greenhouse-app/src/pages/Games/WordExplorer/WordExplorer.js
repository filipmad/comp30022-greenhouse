import React from 'react';

const GameComponent = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Play the Game</h1>
      <iframe
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/WordExplorerGame/index.html`}
        width="800"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default function WordExplorer() {
  return (
	<div>
	  <h1>WordExplorer</h1>
	  <GameComponent />
	</div>
  );
}