package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type PersonalScore struct {
	UserID         int           `json:"UserID"`
	Coins          int           `json:"Coins"`
	HighScoreGame1 *EcoAdventure `json:"EcoAdventure"`
	HighScoreGame2 *CityScape    `json:"CityScape"`
	HighScoreGame3 *Crossword    `json:"Crossword"`
	HighScoreQuiz1 int           `json:"HighScoreQuiz1"`
	HighScoreQuiz2 int           `json:"HighScoreQuiz2"`
	HighScoreQuiz3 int           `json:"HighScoreQuiz3"`
}

type EcoAdventure struct {
	Score int `json:"Score"`
	Coins int `json:"Coins"`
}

type Crossword struct {
	HasCompleted bool `json:"HasCompleted"`
	CrosswordID  int  `json:"CrosswordID"`
}
type CityScape struct {
	Population        int `json:"Population"`
	Funds             int `json:"Funds"`
	Happiness         int `json:"Happiness"`
	Pollution         int `json:"Pollution"`
	Education         int `json:"Education"`
	Poverty           int `json:"Poverty"`
	EnergyQuota       int `json:"EnergyQuota"`
	PopulationChange  int `json:"PopulationChange"`
	PollutionChange   int `json:"PollutionChange"`
	FundsChange       int `json:"FundsChange"`
	EducationChange   int `json:"EducationChange"`
	PovertyChange     int `json:"PovertyChange"`
	EnergyQuotaChange int `json:"EnergyQuotaChange"`
	HappinessChange   int `json:"HappinessChange"`
}

// Gets Score relating to User
func getScores(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	db := connectToDB()
	var userID int
	userID, err = strconv.Atoi(cookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	//Checks which game is selected
	if db != nil {
		var userScore PersonalScore
		var err error
		if params["gameType"] == "EcoAdventure" {
			userScore, err = ReadEcoAdventureDB(db, userID)
		} else if params["gameType"] == "CityScape" {
			userScore, err = ReadCityScapeDB(db, userID)
		} else if params["gameType"] == "Crossword" {
			crosswordID, readErr := strconv.Atoi(params["CrosswordID"])
			if readErr != nil {
				http.Error(w, "Invalid Crossword ID", http.StatusInternalServerError)
			}
			userScore, err = ReadCrosswordDB(db, userID, crosswordID)

		} else if params["gameType"] == "Quiz" {
			userScore, err = ReadQuizDB(db, userID)
		} else {
			userScore = PersonalScore{}
		}
		if err != nil {
			http.Error(w, "Failed to read game", http.StatusInternalServerError)
		}
		json.NewEncoder(w).Encode(userScore)
	}

}

// Updates EcoAdventure information
func updateEcoAdventure(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	userID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		log.Fatal(err.Error())
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)

	db := connectToDB()
	if db != nil {
		scores, err := getUserID(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if the user exists in the db
			for _, item := range scores {
				if item.UserID == updated.UserID {

					updatedScore := PersonalScore{UserID: userID, Coins: updated.Coins, HighScoreGame1: updated.HighScoreGame1}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update EcoAdventure", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Update the values of CityScape
func updateCityScape(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	userID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)
	db := connectToDB()
	if db != nil {
		scores, err := getUserID(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if the user exists in the db
			for _, item := range scores {
				if item.UserID == userID {
					updatedScore := PersonalScore{UserID: updated.UserID, Coins: updated.Coins, HighScoreGame2: updated.HighScoreGame2}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update CityScape", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Update the Value of Crossword
func updateCrossword(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	userID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		log.Fatal(err.Error())
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)

	db := connectToDB()
	if db != nil {
		scores, err := getUserID(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if User exists
			for _, item := range scores {
				if item.UserID == userID {
					updatedScore := PersonalScore{UserID: userID, Coins: updated.Coins}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update Crossword", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Update Quiz1 Score
func UpdateQuiz1Score(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID, err := strconv.Atoi(params["userID"])
	if err != nil {
		log.Fatal(err.Error())
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)
	db := connectToDB()
	if db != nil {
		users, err := getUserID(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if User exists
			for _, item := range users {
				if item.UserID == userID {
					updatedScore := PersonalScore{UserID: updated.UserID, Coins: updated.Coins, HighScoreQuiz1: updated.HighScoreQuiz1}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update Quiz 1 score", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Update Quiz 2 score
func UpdateQuiz2Score(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID, err := strconv.Atoi(params["userID"])
	if err != nil {
		log.Fatal(err.Error())
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)
	db := connectToDB()
	if db != nil {
		users, err := getUserID(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if User exists
			for _, item := range users {
				if item.UserID == userID {
					updatedScore := PersonalScore{UserID: updated.UserID, HighScoreQuiz2: updated.HighScoreQuiz2}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update Quiz 2 Score", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Update Quiz 3 Score
func UpdateQuiz3Score(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	userID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	var updated PersonalScore
	_ = json.NewDecoder(r.Body).Decode(&updated)
	db := connectToDB()
	if db != nil {
		users, err := getUserID(db, updated.UserID)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			//Check if User exists
			for _, item := range users {
				if item.UserID == userID {
					updatedScore := PersonalScore{UserID: updated.UserID, Coins: updated.Coins, HighScoreQuiz3: updated.HighScoreQuiz3}
					_, err := updateScore(db, updatedScore)
					if err != nil {
						http.Error(w, "Failed to update Quiz 3 Score", http.StatusInternalServerError)
					}
					w.WriteHeader(http.StatusOK)
					json.NewEncoder(w).Encode(map[string]bool{"success": true})
					break
				}

			}

		}

	}
}

// Gets the UserID
func getUserID(db *sql.DB, userID int) ([]PersonalScore, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	tsql := (`SELECT [userID] FROM Users where userID = @p1`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var score []PersonalScore
	//Scans every row and converts it into a user struct to be returned
	for rows.Next() {
		var uID int
		err := rows.Scan(&uID)
		if err != nil {
			return nil, err
		}
		newScore := PersonalScore{UserID: uID}
		score = append(score, newScore)

	}

	return score, nil

}

// Insert a new record of the current completion of a crossword
func insertCrosswordCompletion(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	userID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	var newCrossword Crossword
	_ = json.NewDecoder(r.Body).Decode(&newCrossword)

	db := connectToDB()
	if db != nil {

		check, err := createCrosswordDB(db, newCrossword, userID)
		if err != nil {
			http.Error(w, "Failed to insert Crossword", http.StatusInternalServerError)
		}
		fmt.Print(check)
	}
	json.NewEncoder(w).Encode(newCrossword)
}

// Updates the score of a player based on the game
func updateScore(db *sql.DB, updated PersonalScore) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}
	//Always update the userBalance
	tsql := (`UPDATE dbo.Users SET userBalance = userBalance + (@p1) where userID = @p2`)
	rows, err := db.ExecContext(ctx, tsql, updated.Coins, updated.UserID)
	if err != nil {
		return -1, err
	}
	rowsChanged, err := rows.RowsAffected()
	fmt.Printf("%d", rowsChanged)
	if err != nil {
		return -1, err
	}

	var modified sql.Result
	var check error
	//EcoAdventure updated
	if updated.HighScoreGame1 != nil {
		qSQL := (`UPDATE dbo.Users SET gameOneHighScore = @p1 where userID = @p2`)
		modified, check = db.ExecContext(ctx, qSQL, updated.HighScoreGame1.Score, updated.UserID)
		//CityScape Updated
	} else if updated.HighScoreGame2 != nil {
		qSQL := (`UPDATE dbo.Cityscape SET Population = @p1, Funds = @p2, Happiness = @p3, Pollution = @p4, Education = @p5, Poverty = @p6, EnergyQuota = @p7, PopulationChange = @p8, PollutionChange = @p9, FundsChange = @p10, EducationChange = @p11, PovertyChange = @p12, EnergyQuotaChange = @p13, HappinessChange = @p14 where userID = @p15`)
		modified, check = db.ExecContext(ctx, qSQL, updated.HighScoreGame2.Population, updated.HighScoreGame2.Funds, updated.HighScoreGame2.Happiness, updated.HighScoreGame2.Pollution, updated.HighScoreGame2.Education, updated.HighScoreGame2.Poverty, updated.HighScoreGame2.EnergyQuota, updated.HighScoreGame2.PopulationChange, updated.HighScoreGame2.PollutionChange, updated.HighScoreGame2.FundsChange, updated.HighScoreGame2.EducationChange, updated.HighScoreGame2.PovertyChange, updated.HighScoreGame2.EnergyQuotaChange, updated.HighScoreGame2.HappinessChange, updated.UserID)
		//CrossWord updated
	}
	if check != nil || modified == nil {
		return -1, check
		//Check whether any rows is affected
	} else {
		changed, err := modified.RowsAffected()
		if err != nil {
			return -1, check

		} else {
			return rowsChanged + changed, nil

		}
	}
}

// Read Eco Adventure from DB
func ReadEcoAdventureDB(db *sql.DB, userID int) (PersonalScore, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return PersonalScore{}, err
	}

	// Custom SQL Selection Query

	tsql := ("SELECT [userID], [gameOneHighScore] FROM dbo.Users WHERE userID = @p1")

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return PersonalScore{}, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID)
	if err != nil {
		return PersonalScore{}, err
	}

	defer rows.Close()

	//Scans every row and converts it into a  struct to be returned
	for rows.Next() {
		var uID int
		var score int

		err := rows.Scan(&uID, &score)
		if err != nil {
			return PersonalScore{}, err
		}
		ecoAdventure := EcoAdventure{Score: score}
		newScore := PersonalScore{UserID: uID, HighScoreGame1: &ecoAdventure}
		return newScore, nil

	}
	return PersonalScore{}, nil
}

// Read Cityscape from DB
func ReadCityScapeDB(db *sql.DB, userID int) (PersonalScore, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return PersonalScore{}, err
	}

	// Custom SQL Selection Query

	tsql := (`SELECT dbo.Cityscape.* FROM dbo.CityScape where userID = @p1`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return PersonalScore{}, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID)
	if err != nil {
		return PersonalScore{}, err
	}

	defer rows.Close()

	//Scans every row and converts it into a struct to be returned
	for rows.Next() {
		var cID, uID, education, educationChange, population, funds, happiness, pollution, poverty, energyQuota, populationChange, fundsChange, happinessChange, pollutionChange, povertyChange, energyQuotaChange int
		err := rows.Scan(&uID, &cID, &population, &funds, &happiness, &pollution, &poverty, &energyQuota, &populationChange, &fundsChange, &happinessChange, &pollutionChange, &povertyChange, &energyQuotaChange, &education, &educationChange)
		if err != nil {
			return PersonalScore{}, err
		}
		cityScape := CityScape{Population: population, Funds: funds, Happiness: happiness, Education: education, Pollution: pollution, Poverty: poverty, EnergyQuota: energyQuota, PopulationChange: populationChange, FundsChange: fundsChange, HappinessChange: happinessChange, PollutionChange: pollutionChange, EnergyQuotaChange: energyQuotaChange, EducationChange: educationChange}
		newScore := PersonalScore{UserID: uID, HighScoreGame2: &cityScape}

		return newScore, nil
	}
	return PersonalScore{}, nil
}

// Read Crossword from DB
func ReadCrosswordDB(db *sql.DB, userID int, crosswordID int) (PersonalScore, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return PersonalScore{}, err
	}

	// Custom SQL Selection Query

	tsql := (`SELECT dbo.Users.userID, dbo.Crossword.hasCompleted, dbo.Crossword.crosswordID FROM dbo.Users INNER JOIN dbo.Crossword on dbo.Crossword.userID = dbo.Users.userID where dbo.Users.userID = @p1 and dbo.Crossword.crosswordID = @p2`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return PersonalScore{}, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID, crosswordID)
	if err != nil {
		return PersonalScore{}, err
	}

	defer rows.Close()

	//Scans every row and converts it into a struct to be returned
	for rows.Next() {
		var uID, cwID int
		var completedcheck int
		var hascompleted bool
		err := rows.Scan(&uID, &completedcheck, &cwID)
		if err != nil {
			return PersonalScore{}, err
		}
		if completedcheck == 0 {
			hascompleted = false

		} else {
			hascompleted = true
		}
		crossword := Crossword{HasCompleted: hascompleted, CrosswordID: cwID}
		newScore := PersonalScore{UserID: uID, HighScoreGame3: &crossword}

		return newScore, nil
	}
	return PersonalScore{}, nil
}

// Read Quiz Scores from DB
func ReadQuizDB(db *sql.DB, userID int) (PersonalScore, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return PersonalScore{}, err
	}

	// Custom SQL Selection Query

	tsql := (`SELECT [userID], [userBalance] [quiz1Score],  [quiz2Score], [quiz3Score] FROM dbo.Users where userID = @p1`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return PersonalScore{}, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID)
	if err != nil {
		return PersonalScore{}, err
	}

	defer rows.Close()

	//Scans every row and converts it into a  struct to be returned
	for rows.Next() {
		var uID, totalcoins, q1, q2, q3 int

		err := rows.Scan(&uID, &totalcoins, &q1, &q2, &q3)
		if err != nil {
			return PersonalScore{}, err
		}

		newScore := PersonalScore{UserID: uID, Coins: totalcoins, HighScoreQuiz1: q1, HighScoreQuiz2: q2, HighScoreQuiz3: q3}

		return newScore, nil
	}
	return PersonalScore{}, nil
}

// Inserts the value into DB
func createScoreDB(db *sql.DB, userID int) (int64, error) {

	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	cityScape := "INSERT INTO dbo.CityScape(userID)"
	insertCity, err := db.ExecContext(ctx, cityScape, userID)
	if err != nil {
		fmt.Printf("Execution error")
		return -1, err

	}
	cityID, err := insertCity.RowsAffected()
	if err != nil {
		return -1, err
	}

	return cityID, nil

}

// Creates a crossword completion entry for user
func createCrosswordDB(db *sql.DB, crossword Crossword, userID int) (int64, error) {

	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	crosswordstat := "INSERT INTO dbo.Crossword(userID, hasCompleted, crosswordID) VALUES (@p1, @p2, @p3)"
	insertCross, err := db.ExecContext(ctx, crosswordstat, userID, crossword.HasCompleted, crossword.CrosswordID)
	if err != nil {
		fmt.Printf("Execution error")
		return -1, err

	}
	crossID, err := insertCross.RowsAffected()
	if err != nil {
		return -1, err
	}

	return crossID, nil

}
