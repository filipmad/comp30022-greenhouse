import React from "react";
import "./GameSelectionBox.css";

export default function GameSelectionBox({game}) {
  if (game === "game1") {
    return (
      <a href="/games/wordexplorer" className="gameLink">Word Explorer</a>
    );
  }
  else if (game === "game2") {
    return (
      <a href="/games/cityscape" className="gameLink">CityScape</a>
    );
  }
  else if (game === "game3") {
    return (
      <a href="/games/eco_adventure" className="gameLink">Eco Adventure</a>
    );
  }
  else if (game === "quiz1") {
    return (
      <a href="/games/social_quiz" className="quizLink">Social Issues</a>
    );
  }
  else if (game === "quiz2") {
    return (
      <a href="/games/economic_quiz" className="quizLink">Economic Issues</a>
    );
  }
  else if (game === "quiz3") {
    return (
      <a href="/games/environmental_quiz" className="quizLink">Environmental Issues</a>
    );
  }
  else {
    return (
      <a href="/games"></a>
    );
  }
}