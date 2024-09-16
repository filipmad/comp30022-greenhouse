import './App.css';
import MainNav from './components/MainNav';
import SettingsSection from './components/SettingsSection';
import Title from './components/Title';
import MainLogo from './components/MainLogo';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games"
import Garden from "./pages/Garden"
import Community from "./pages/Community"
import News from "./pages/News"
import Information from "./pages/Information"


export default function myApp() {
  return (
    <div>
      <MainLogo />
      <Title />
      <SettingsSection />

      <Router>
        <MainNav />
        <Routes>
          <Route exact path="/home" element={<Home />} />
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
