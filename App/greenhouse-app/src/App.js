import './App.css';
import NavBar from './components/NavBar/NavBar';
import SettingsSection from './components/SettingsSection/SettingsSection';
import Title from './components/Title/Title';
import MainLogo from './components/MainLogo/MainLogo';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Garden from "./pages/Garden";
import Community from "./pages/Community";
import News from "./pages/News";
import Information from "./pages/Information";


export default function myApp() {
  return (
    <div>
      <div className="header">
        <MainLogo />
        <Title />
        <SettingsSection />
      </div>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Information />} />
          <Route path="/games" element={<Games />} />
          <Route path="/grow" element={<Garden />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
          </Routes>
      </Router>

    </div>
  );
}
