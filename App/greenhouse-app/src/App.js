import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SettingsSection from "./components/SettingsSection/SettingsSection";
import Title from "./components/Title/Title";
import MainLogo from "./components/MainLogo/MainLogo";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Games from "./pages/Games/Games";
import Garden from "./pages/Garden/Garden";
import Community from "./pages/Community/Community";
import News from "./pages/News/News";
import Information from "./pages/Information/Information";
import WordExplorer from "./pages/Games/WordExplorer/WordExplorer";
import EcoAdventure from "./pages/Games/EcoAdventure/EcoAdventure";
import CityScape from "./pages/Games/CityScape/CityScape";


export default function myApp() {
  return (
    <Router>
      <div>
        <div className="header">
          <MainLogo />
          <Title />
          <SettingsSection />
        </div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Information />} />
          <Route path="/games" element={<Games />} />
          <Route path="/grow" element={<Garden />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          <Route path="/games/WordExplorer" element={<WordExplorer />} />
          <Route path="/games/EcoAdventure" element={<EcoAdventure />} />
          <Route path="/games/CityScape" element={<CityScape />} />
        </Routes>
      </div>
    </Router>
  );
}
