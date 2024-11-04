import React, { useEffect, useRef } from 'react';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const fetchHighScore = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-score', { withCredentials: true });
      iframeRef.current.contentWindow.postMessage({ type: 'highScoreResponse', score: response.data }, window.location.origin);
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };
  const updateHighScore = async (score) => {
		try {
			await axios.post('http://localhost:8000/update-score', {
				highScore: score
			});

		} catch (error) {
			console.error('Error saving high score:', error);
		}
	};
  const updateCoins = async (coins) => {
		try {
			await axios.post('http://localhost:8000/update-coins', {
				addCoins: coins,
			});

		} catch (error) {
			console.error('Error updating coins:', error);
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
    if(data.type === 'addCoins') {
      updateCoins(data.coins);
    }
    else if(data.type === 'highScore') {
      updateHighScore(data.score);
    }
    else if(data.type === 'getHighScore') {
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