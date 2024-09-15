function NavButton({text}) {
    return (
      <button class="navButton">{text}</button>
    );
  }

export default function MainNav() {
  return(
    <div class="page">
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