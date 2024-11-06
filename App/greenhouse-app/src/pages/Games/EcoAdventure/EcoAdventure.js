import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const GameComponent = () => {
  const iframeRef = useRef(null);

  //const response = await axios.get('http://localhost:8000/Game/EcoAdventure', { withCredentials: true });

  const fetchHighScore = async () => {
    try {
        const response = await axios.get('http://localhost:8000/get-ecoadventure-score', { withCredentials: true });
        const highScore = response.data.EcoAdventureHighScore;
        console.log("Fetched high score:", highScore);

        // Send the high score to the iframe
        iframeRef.current.contentWindow.postMessage({ type: 'highScoreResponse', score: highScore }, window.location.origin);
    } catch (error) {
        console.error('Error fetching high score:', error);
    }
};



  const updateEcoAdventure = async (score, addedCoins) => {
    try {
      await axios.post('http://localhost:8000/update-ecoadventure-score', {
        newScore: score,
        newCoins: addedCoins,
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error saving high score:', error);
    }
  };

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
    if (data.type === 'update') {
      updateEcoAdventure(data.score, data.coins);
    }
    else if (data.type === 'getHighScore') {
      fetchHighScore();
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        ref={iframeRef}
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/EcoAdventureGame/index.html`}
        width="1067"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default function EcoAdventure() {
  return (
    <div>
      <h1>EcoAdventure</h1>
      <GameComponent />
    </div>
  );
}