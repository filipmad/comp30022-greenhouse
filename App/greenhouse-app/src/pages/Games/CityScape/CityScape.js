import React, { useEffect, useRef } from 'react';
import axios from 'axios';

const GameComponent = () => {
  const iframeRef = useRef(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/Game/CityScape', { withCredentials: true });

      const stats = {
        population: response.CityScape.Population,
        funds: response.CityScape.Funds,
        happiness: response.CityScape.Happiness,
        pollution: response.CityScape.Pollution,
        education: response.CityScape.Education,
        poverty: response.CityScape.Poverty,
        energyQuota: response.CityScape.EnergyQuota,
      };

      const hiddenStats = {
        populationChange: response.CityScape.PopulationChange,
        fundsChange: response.CityScape.FundsChange,
        happinessChange: response.CityScape.HappinessChange,
        pollutionChange: response.CityScape.PollutionChange,
        educationChange: response.CityScape.EducationChange,
        povertyChange: response.CityScape.PovertyChange,
        energyQuotaChange: response.CityScape.EnergyQuotaChange,
      };

      iframeRef.current.contentWindow.postMessage({ type: 'loadStatsResponse', stats: stats, hiddenStats: hiddenStats }, window.location.origin);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };
  const patchStats = async (stats, hiddenStats, addedCoins) => {
    try {
      await axios.patch('http://localhost:8000/CityScape', {
        Coins: addedCoins,
        CityScape: {
          "Population": stats.population, "Funds": stats.funds, "Happiness": stats.happiness, "Pollution": stats.pollution,
          "Education": stats.education, "Poverty": stats.poverty, "EnergyQuota": stats.energyQuota, "PopulationChange": hiddenStats.populationChange,
          "FundsChange": hiddenStats.fundsChange, "HappinessChange": hiddenStats.happinessChange, "PollutionChange": hiddenStats.pollutionChange,
          "EducationChange": hiddenStats.educationChange, "PovertyChange": hiddenStats.povertyChange, "EnergyQuotaChange": hiddenStats.energyQuotaChange
        }
      }, { withCredentials: true });

    } catch (error) {
      console.error('Error saving stats:', error);
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
    if (data.type === 'saveStats') {
      patchStats(data.stats, data.hiddenStats, data.coins);
    }
    else if (data.type === 'loadStats') {
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
