package main

type PersonalScore struct {
	HighScoreGame1 *Score
	HighScoreGame2 *Score
	HighScoreGame3 *Score
	HighScoreQuiz1 *Score
	HighScoreQuiz2 *Score
	HighScoreQuiz3 *Score
}

type Score struct {
	ID    int
	score int
}
