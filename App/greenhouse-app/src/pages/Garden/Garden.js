import React, { useEffect, useRef } from 'react';

const GameComponent = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    function handleMessage(event) {
      // Security check: Verify the origin of the message
      if (event.origin !== window.location.origin) {
        console.warn('Unknown origin:', event.origin);
        return;
      }

      const data = event.data;

      console.log('Data received from iframe:', data);

      sendDataToDatabase(data);
    }

    // Add the event listener
    window.addEventListener('message', handleMessage);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  function sendDataToDatabase(data) {
    // we need to implement the logic to send data to the database

    // Depending on the data type, perform specific actions
    if(data.type === 'updateCoins') {
      // Send coins to database
    }
    else if(data.type === 'streak') {
      // Fetch the streak from the database

      // sample:
      const sampleStreak = 10;

      iframeRef.current.contentWindow.postMessage({ type: 'streakResponse', streak: sampleStreak }, window.location.origin);
    }
    else if(data.type === 'swap') {
      // Update the plant's position in the database
    }
    else if(data.type === 'move') {
      // Update the plant's position in the database
    }
    else if(data.type === 'getPlants') {
      // Fetch the user's plants

      // sample:
      const samplePlants = [
        { position: 1, name: "Basic Bud" },
        { position: 2, name: "Rare Bud" },
        { position: 3, name: "Regular Bush" },
        { position: 6, name: "Basic Bud" },
        { position: 7, name: "Rare Bud" },
        { position: 10, name: "Baby Tree" },
        { position: 11, name: "Regular Bush" },
        { position: 12, name: "Basic Bud" },
        { position: 13, name: "Rare Bud" },
        { position: 15, name: "Rare Bud" },
        { position: 17, name: "Basic Bud" },
        { position: 18, name: "Rare Bud" }
    ];

      iframeRef.current.contentWindow.postMessage({ type: 'getPlantsResponse', plants: samplePlants}, window.location.origin);
    }
    else if(data.type === 'sellPlant') {
      // Remove the plant from the database
    }
    else if(data.type === 'addPlant') {
      // Add the plant to the database

    }
    else if(data.type === 'getCoins') {
      // Fetch the player's coins from the database

      // sample:
      const sampleCoins = 100;

      iframeRef.current.contentWindow.postMessage({ type: 'getCoinsResponse', coins: sampleCoins }, window.location.origin);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        ref={iframeRef}
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
