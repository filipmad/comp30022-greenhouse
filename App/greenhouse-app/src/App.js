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
import Account from "./pages/Account/Account"
import SignUp from "./pages/Account/SignUp";

import Social from "./pages/Information/Social/Social";
import Goal1 from "./pages/Information/Social/SocialGoals/Goal1";
import Goal2 from "./pages/Information/Social/SocialGoals/Goal2";
import Goal3 from "./pages/Information/Social/SocialGoals/Goal3";
import Goal4 from "./pages/Information/Social/SocialGoals/Goal4";
import Goal5 from "./pages/Information/Social/SocialGoals/Goal5";
import Goal10 from "./pages/Information/Social/SocialGoals/Goal10";
import Goal16 from "./pages/Information/Social/SocialGoals/Goal16";

import Economical from "./pages/Information/Economical/Economical";
import Goal8 from "./pages/Information/Economical/EconomicalGoals/Goal8";
import Goal9 from "./pages/Information/Economical/EconomicalGoals/Goal9";
import Goal11 from "./pages/Information/Economical/EconomicalGoals/Goal11";
import Goal12 from "./pages/Information/Economical/EconomicalGoals/Goal12";

import Environmental from "./pages/Information/Environmental/Environmental";
import Goal6 from "./pages/Information/Environmental/EnvironmentalGoals/Goal6";
import Goal7 from "./pages/Information/Environmental/EnvironmentalGoals/Goal7";
import Goal13 from "./pages/Information/Environmental/EnvironmentalGoals/Goal13";
import Goal14 from "./pages/Information/Environmental/EnvironmentalGoals/Goal14";
import Goal15 from "./pages/Information/Environmental/EnvironmentalGoals/Goal15";



import WordExplorer from "./pages/Games/WordExplorer/WordExplorer";
import EcoAdventure from "./pages/Games/EcoAdventure/EcoAdventure";
import CityScape from "./pages/Games/CityScape/CityScape";
import SDGQuizzes from "./pages/Games/SDGQuizzes/SDGQuizzes";



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
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/discover/social" element={<Social />} />
          <Route path="/discover/social/goal1" element={<Goal1 />} />
          <Route path="/discover/social/goal2" element={<Goal2 />} />
          <Route path="/discover/social/goal3" element={<Goal3 />} />
          <Route path="/discover/social/goal4" element={<Goal4 />} />
          <Route path="/discover/social/goal5" element={<Goal5 />} />
          <Route path="/discover/social/goal10" element={<Goal10 />} />
          <Route path="/discover/social/goal16" element={<Goal16 />} />

          <Route path="/discover/economical" element={<Economical />} />
          <Route path="/discover/economical/goal8" element={<Goal8 />} />
          <Route path="/discover/economical/goal9" element={<Goal9 />} />
          <Route path="/discover/economical/goal11" element={<Goal11 />} />
          <Route path="/discover/economical/goal12" element={<Goal12 />} />

          <Route path="/discover/environmental" element={<Environmental />} />
          <Route path="/discover/environmental/goal6" element={<Goal6 />} />
          <Route path="/discover/environmental/goal7" element={<Goal7 />} />
          <Route path="/discover/environmental/goal13" element={<Goal13 />} />
          <Route path="/discover/environmental/goal14" element={<Goal14 />} />
          <Route path="/discover/environmental/goal15" element={<Goal15 />} />

          <Route path="/games" element={<Games />} />
          <Route path="/grow" element={<Garden />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          <Route path="/games/WordExplorer" element={<WordExplorer />} />
          <Route path="/games/EcoAdventure" element={<EcoAdventure />} />
          <Route path="/games/CityScape" element={<CityScape />} />
          <Route path="/games/SDGQuizzes" element={<SDGQuizzes />} />
        </Routes>
      </div>
    </Router>
  );
}
