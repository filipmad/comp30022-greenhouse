import './App.css';
import MainNav from './components/MainNav';
import SettingsSection from './components/SettingsSection';
import Title from './components/Title';
import MainLogo from './components/MainLogo';


export default function myApp() {
  return (
    <div>
      <MainLogo />
      <Title />
      <SettingsSection />

      <MainNav />
    </div>
  );
}
