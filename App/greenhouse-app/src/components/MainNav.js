import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

function NavButton({text}) {
    return (
      <button class="navButton">{text}</button>
    );
  }

  const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
      color: #4d4dff;
  }
`;

export default function MainNav() {
  return(
    <div class="page">
      <nav class="mainNav">
        <NavLink to="/games" activeStyle>
          Contact Us
        </NavLink>
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