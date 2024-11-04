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
    else if(data.type === 'complete') {
      // Fetch the players completion status of the puzzle ID from the database
      // if it is complete, send true back to the iframe
      // if it is not complete, send false back to the iframe and update the completion status in the database to complete

      // sample:
      const completeStatus = false;

      iframeRef.current.contentWindow.postMessage({ type: 'completeResponse', complete: completeStatus }, window.location.origin);
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