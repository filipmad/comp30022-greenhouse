import React from "react";
import "./Games.css";
import GameSelectionBox from "./GamesComponents/GameSelectionBox";

export default function Games() {
  return (
	<div className="container">
    	<div className="gamesContainer">
      		<GameSelectionBox game="game1" />
	  		<GameSelectionBox game="game2" />
	  		<GameSelectionBox game="game3" />
    	</div>
		<div className="quizContainer">
			<h1>SDG Quizzes</h1>
			<div className="quizLinks">
	  		<GameSelectionBox game="quiz1" />
			<GameSelectionBox game="quiz2" />
			<GameSelectionBox game="quiz3" />
			</div>
		</div>
	</div>
  );
}