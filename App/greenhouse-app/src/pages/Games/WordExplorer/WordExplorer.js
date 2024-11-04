import React, { useEffect, useRef } from 'react';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const updateCompletion = async (puzzleID) => {
    try {
      await axios.post('http://localhost:8000/update-completion', {
        puzzleID,
      });

    } catch (error) {
      console.error('Error updating puzzle completion:', error);
    }
  };
  const fetchCompletion = async (puzzleID) => {
    try {
      const response = await axios.get('http://localhost:8000/get-completion', { params: {puzzleID}, withCredentials: true });
      iframeRef.current.contentWindow.postMessage({ type: 'completeResponse', complete: response.data }, window.location.origin);
      if(response.data === false) {
        updateCompletion(puzzleID);
      }

    } catch (error) {
      console.error('Error fetching puzzle completion:', error);
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
    else if(data.type === 'complete') {
      fetchCompletion(data.puzzleID);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <iframe
        ref={iframeRef}
        title="phaser-game"
        src={`${process.env.PUBLIC_URL}/WordExplorerGame/index.html`}
        width="1067"
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