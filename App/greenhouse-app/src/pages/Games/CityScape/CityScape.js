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
    if(data.type === 'addCoins') {
      // Send coins to database
    }
    else if(data.type === 'saveStats') {
      // Save the player's stats to the database
    }
    else if(data.type === 'loadStats') {
      // Fetch the player's stats from the database

      // sample:
      const initialStats = {
        population: 1000,
        funds: 5000,            
        happiness: 75,
        pollution: 10,
        education: 80,
        poverty: 10,
        energyQuota: 90
    };

    const initialHiddenStats = {
        populationChange: 10,
        fundsChange: 10,
        happinessChange: -0.1,
        pollutionChange: 0.1,
        educationChange: 0,
        povertyChange: 0.1,
        energyQuotaChange: -0.1
    };

      iframeRef.current.contentWindow.postMessage({ type: 'loadStatsResponse', stats: initialStats, hiddenStats: initialHiddenStats }, window.location.origin);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        ref={iframeRef}
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/CityScapeGame/index.html`}
        width="1067"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default function CityScape() {
  return (
    <div>
      <h1>CityScape</h1>
      <GameComponent />
    </div>
  );
}
