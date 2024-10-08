import React from "react";
import "./GameSelectionBox.css";

export default function GameSelectionBox({game}) {
  if (game === "game1") {
    return (
      <a href="/games/WordExplorer" className="gameLink">Word Explorer</a>
    );
  }
  else if (game === "game2") {
    return (
      <a href="/games/CityScape" className="gameLink">CityScape</a>
    );
  }
  else if (game === "game3") {
    return (
      <a href="/games/EcoAdventure" className="gameLink">EcoAdventure</a>
    );
  }
  else if (game === "quiz") {
    return (
      <a href="/games/SDGQuizzes" className="gameLink">SDG Quizzes</a>
    );
  }
  else {
    return (
      <a href="/games"></a>
    );
  }
}