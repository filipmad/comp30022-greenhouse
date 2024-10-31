import React from "react";
import "./Games.css";
import GameSelectionBox from "./GamesComponents/GameSelectionBox";

export default function Games() {
  return (
	<div className="gamesPageContainer">
    	<div className="gamesContainer">
      		<GameSelectionBox game="game1" />
	  		<GameSelectionBox game="game2" />
	  		<GameSelectionBox game="game3" />
    	</div>
		<div className="quizContainer">
			<div className="quizLinks">
			<GameSelectionBox game="quiz" />
			</div>
		</div>
	</div>
  );
}