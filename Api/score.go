package main

type PersonalScore struct {
	UserID         int
	Coins          int
	HighScoreGame1 *EcoAdventure
	HighScoreGame2 *CityScape
	HighScoreGame3 *Crossword
	HighScoreQuiz1 int
	HighScoreQuiz2 int
	HighScoreQuiz3 int
}

type EcoAdventure struct {
	Score int
	Coins int
}
type Crossword struct {
	HasCompleted bool
	Score        int
	CoinsReward  int
	Words        []string
}
type CityScape struct {
}
