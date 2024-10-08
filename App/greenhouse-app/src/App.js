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
import Social from "./pages/Information/Social/Social";
import Goal1 from "./pages/Information/Social/SocialGoals/Goal1";
import Goal2 from "./pages/Information/Social/SocialGoals/Goal2";
import Goal3 from "./pages/Information/Social/SocialGoals/Goal3";
import Goal4 from "./pages/Information/Social/SocialGoals/Goal4";
import Goal5 from "./pages/Information/Social/SocialGoals/Goal5";
import Goal10 from "./pages/Information/Social/SocialGoals/Goal10";
import Goal16 from "./pages/Information/Social/SocialGoals/Goal16";
import Economical from "./pages/Information/Economical/Economical";
import Environmental from "./pages/Information/Environmental/Environmental";
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
          <Route path="/discover/social" element={<Social />} />
          <Route path="/discover/social/goal1" element={<Goal1 />} />
          <Route path="/discover/social/goal2" element={<Goal2 />} />
          <Route path="/discover/social/goal3" element={<Goal3 />} />
          <Route path="/discover/social/goal4" element={<Goal4 />} />
          <Route path="/discover/social/goal5" element={<Goal5 />} />
          <Route path="/discover/social/goal10" element={<Goal10 />} />
          <Route path="/discover/social/goal16" element={<Goal16 />} />
          <Route path="/discover/economical" element={<Economical />} />
          <Route path="/discover/environmental" element={<Environmental />} />
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
