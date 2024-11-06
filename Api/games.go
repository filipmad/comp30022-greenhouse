package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

)

type PersonalScore struct {
	UserID         int           `json:"UserID"`
	Coins          int           `json:"Coins"`
	HighScoreGame1 *EcoAdventure `json:"EcoAdventure"`
	HighScoreQuiz1 int           `json:"HighScoreQuiz1"`
	HighScoreQuiz2 int           `json:"HighScoreQuiz2"`
	HighScoreQuiz3 int           `json:"HighScoreQuiz3"`
}

type EcoAdventure struct {
	Score int `json:"Score"`
	Coins int `json:"Coins"`
}




// Retrieve game data for EcoAdventure
func getEcoAdventureScore(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("userid")
		if err != nil || cookie.Value == "" {
			// No cookie or cookie is empty, user is not authenticated
			http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
			return
		}

		// Convert the userid cookie to an integer
		userID, err := strconv.Atoi(cookie.Value)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}

		// Prepare SQL query to fetch gameThreeHighScore
		var highScore int
		query := `SELECT gameOneHighScore FROM [dbo].[Users] WHERE userID = ?;`
		err = db.QueryRow(query, userID).Scan(&highScore)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User not found", http.StatusNotFound)
			} else {
				http.Error(w, "Error fetching high score", http.StatusInternalServerError)
			}
			return
		}

		// Return the high score as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]int{"EcoAdventureHighScore": highScore})
	}
}

func updateEcoAdventureScore(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Retrieve the userid cookie
		cookie, err := r.Cookie("userid")
		if err != nil || cookie.Value == "" {
			http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
			return
		}

		// Convert the userid cookie to an integer
		userID, err := strconv.Atoi(cookie.Value)
		if err != nil {
			http.Error(w, "Invalid user ID", http.StatusBadRequest)
			return
		}

		// Parse incoming JSON request for the new high score
		var input struct {
			NewScore int `json:"newScore"`
		}
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to update the high score if the new score is higher
		query := `
        UPDATE [dbo].[Users]
        SET gameOneHighScore = CASE WHEN gameOneHighScore < ? THEN ? ELSE gameOneHighScore END
        WHERE userID = ?;
    	`

		// Execute the update query
		_, err = db.Exec(query, input.NewScore, input.NewScore, userID)
		if err != nil {
			http.Error(w, "Failed to update score", http.StatusInternalServerError)
			return
		}

		// Respond with success status
		w.WriteHeader(http.StatusOK)
	}
}
