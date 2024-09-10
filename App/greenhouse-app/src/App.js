import './App.css';

function NavButton({text}) {
  return (
    <button class="navButton">{text}</button>
  );
}

function Title() {
  return (
    <div class="title">
      <h1>Greenhouse</h1>
    </div>
  )
}

// To be replaced with our logo (upload logo to public)
function Logo() {
  return(
    <div class="logo">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" />
    </div>
  )
}

function SettingsButton({type}) {
  let img;
  if(type == "search") {
    img = "search.svg";
  }
  else {
    img = "account.svg";
  }
  
  return (
    <div class="settingsButton">
      <img src={`${process.env.PUBLIC_URL}/${img}`} alt="Logo" />
    </div>
  )
}

function SettingsSection() {
  return (
    <div class="settingsSection">
      <SettingsButton type="search" />
      <SettingsButton type="account" />
    </div>
  )
}

function MainNav() {
  return(
    <div>
      <nav class="mainNav">
        <NavButton text="Home" />
        <NavButton text="Discover" />
        <NavButton text="Games" />
        <NavButton text="Grow" />
        <NavButton text="News" />
        <NavButton text="Community" />
      </nav>
    </div>
  )
}

export default function myApp() {
  return (
    <div>
      <Logo />
      <Title />
      <SettingsSection />

      <MainNav />
    </div>
  );
}
