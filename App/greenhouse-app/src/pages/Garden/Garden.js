import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const fetchStreak = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Garden', { withCredentials: true });
      iframeRef.current.contentWindow.postMessage({ type: 'streakResponse', streak: response.TreeAge }, window.location.origin);
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };
  const fetchPlants = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Plant', { withCredentials: true });
      iframeRef.current.contentWindow.postMessage({ type: 'getPlantsResponse', plants: response.Plants }, window.location.origin);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };
  const swapPlants = async (position1, position2) => {
    try {
      await axios.patch('http://localhost:8000/Plant/Swap', {
        "PositionOne": position1,
        "PositionTwo": position2,
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error swapping plants:', error);
    }
  };
  const movePlant = async (originalPosition, targetPosition) => {
    try {
      await axios.patch('http://localhost:8000/Plant/Move', {
        "PositionOne": originalPosition,
        "PositionTwo": targetPosition,
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error moving plant:', error);
    }
  };
  const addPlant = async (name, position, value) => {
    try {
      await axios.post('http://localhost:8000/Plant', {
        "Name": name,
        "Position": position,
        "Value": value,
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };
  const removePlant = async (position, value) => {
    try {
      await axios.delete('http://localhost:8000/Plant', {
        "Position": position,
        "Value": value,
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error removing plant:', error);
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
    if (data.type === 'streak') {
      fetchStreak();
    }
    else if (data.type === 'swap') {
      swapPlants(data.position1, data.position2);
    }
    else if (data.type === 'move') {
      movePlant(data.original, data.target);
    }
    else if (data.type === 'getPlants') {
      fetchPlants();
    }
    else if (data.type === 'sellPlant') {
      removePlant(data.position, data.value);
    }
    else if (data.type === 'addPlant') {
      addPlant(data.name, data.position, data.value);
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
