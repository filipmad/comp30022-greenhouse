import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const updateCoins = async (addedCoins) => {
		try {
			await axios.post('http://localhost:8000/update-coins', {
				Coins: addedCoins,
			}, {withCredentials: true });

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

    // Depending on the data type, perform specific actions
    if(data.type === 'addCoins') {
      updateCoins(data.coins);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        ref={iframeRef}
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/SDGQuizzesGame/index.html`}
        width="1067"
        height="600"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default function SDGQuizzes() {
  return (
    <div>
      <h1>SDG Quizzes</h1>
      <GameComponent />
    </div>
  );
}