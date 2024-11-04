import React, { useEffect, useRef } from 'react';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-stats', { withCredentials: true });
      iframeRef.current.contentWindow.postMessage({ type: 'loadStatsResponse', stats: response.data.stats, hiddenStats: response.data.hiddenStats }, window.location.origin);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const patchStats = async (stats, hiddenStats) => {
		try {
			await axios.post('http://localhost:8000/patch-stats', {
				stats: stats,
        hiddenStats: hiddenStats,
			});

		} catch (error) {
			console.error('Error saving stats:', error);
		}
	};
  const updateCoins = async (coins) => {
		try {
			await axios.post('http://localhost:8000/update-coins', {
				coins: coins
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
    else if(data.type === 'saveStats') {
      patchStats(data.stats, data.hiddenStats);
    }
    else if(data.type === 'loadStats') {
      fetchStats();
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
