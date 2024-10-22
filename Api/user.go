package main

import (
	"database/sql"
	"encoding/json"
	"strconv"
	"fmt"

	"net/http"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

type User struct {
	UserID             uint      `json:"userID" gorm:"primaryKey;autoIncrement"`
	FirstName          string    `json:"firstName" gorm:"type:varchar(30);not null"`
	LastName           string    `json:"lastName" gorm:"type:varchar(30);not null"`
	Email              string    `json:"email" gorm:"type:varchar(50);not null;unique"`
	Password           string    `json:"password" gorm:"type:varchar(50);not null"`
	ProfilePic         string    `json:"profilePic" gorm:"type:varchar(250);not null"`
	University         string    `json:"university" gorm:"type:varchar(45);not null"`
	UserBalance        int       `json:"userBalance" gorm:"default:0;not null"`
	DateCreated        time.Time `json:"dateCreated" gorm:"type:date;not null;default:CURRENT_DATE"`
	GameOneHighScore   int       `json:"gameOneHighScore" gorm:"default:0;not null"`
	GameTwoHighScore   int       `json:"gameTwoHighScore" gorm:"default:0;not null"`
	GameThreeHighScore int       `json:"gameThreeHighScore" gorm:"default:0;not null"`
	QuizOneHighScore   int       `json:"quizOneHighScore" gorm:"default:0;not null"`
	QuizTwoHighScore   int       `json:"quizTwoHighScore" gorm:"default:0;not null"`
	QuizThreeHighScore int       `json:"quizThreeHighScore" gorm:"default:0;not null"`
	IsAdmin            bool      `json:"isAdmin" gorm:"default:false;not null"`
}

type ResponseMessage struct {
	Success  bool   `json:"success"`
	UserID   int    `json:"userid"`
	GardenID int    `json:"gardenid"`
	Message  string `json:"message"`
}

func handleUsernameCheck(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input User

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if db == nil {
			print("db is nil")
			return
		}
		// print("db is alive")

		var gardenID, userID int
		// QueryRow avoids SQL Injection attacks
		err := db.QueryRow(`
			SELECT u.userID, g.gardenID
			FROM [Users] u
			JOIN [Garden] g ON u.userID = g.userID
			WHERE u.email = ? AND u.password = ?`, 
		input.Email, input.Password).Scan(&userID, &gardenID)

		if err != nil {
			if err == sql.ErrNoRows {
				// Username does not exist
				userID = -1
				gardenID = -1
			} else {
				// Query failed
				http.Error(w, "Invalid email or password", http.StatusInternalServerError)
				return
			}
		}

		//fmt.Println(userID);
		//fmt.Print(gardenID);

		var response ResponseMessage
		if userID != -1 {

			http.SetCookie(w, &http.Cookie{
				Name:     "userid",
				Value:    strconv.Itoa(userID),
				Path:     "/",
				Expires:  time.Now().Add(24 * time.Hour), // 24-hour expiry
				HttpOnly: true,                          // Prevent JavaScript access
				Secure:   true,                          // Only send over HTTPS
			})

			http.SetCookie(w, &http.Cookie{
				Name:     "gardenid",
				Value:    strconv.Itoa(gardenID),
				Path:     "/",
				Expires:  time.Now().Add(24 * time.Hour), // 24-hour expiry
				HttpOnly: true,                          // Prevent JavaScript access
				Secure:   true,                          // Only send over HTTPS
			})


			response = ResponseMessage{
				Success: true,
				UserID:  userID,
				GardenID: gardenID,
				Message: "Login Success",
			}

		} else {

			response = ResponseMessage{
				Success: false,
				UserID:  userID,
				GardenID: gardenID,
				Message: "Login Failed",
			}
		}

		// Send the success/failure response back to the frontend
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func handleCreateProfile(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var profile User

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&profile); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Updated query with placeholders
		query := `
		INSERT INTO [dbo].[Users] 
		(
			[firstName], 
			[lastName], 
			[email], 
			[password], 
			[profilePic], 
			[university], 
			[userBalance], 
			[dateCreated], 
			[gameOneHighScore], 
			[gameTwoHighScore], 
			[gameThreeHighScore], 
			[quizOneHighScore], 
			[quizTwoHighScore], 
			[quizThreeHighScore], 
			[isAdmin]
		)
		VALUES 
		(?, ?, ?, ?, ?, ?, ?, CAST(GETDATE() AS DATE), ?, ?, ?, ?, ?, ?, ?);
		`

		// Insert the new profile into the database
		_, err := db.Exec(query,
			profile.FirstName,          // First Name
			profile.LastName,           // Last Name
			profile.Email,              // Email
			profile.Password,           // Password
			profile.ProfilePic,         // Profile Picture
			profile.University,         // University
			profile.UserBalance,        // User Balance
			profile.GameOneHighScore,   // Game One High Score
			profile.GameTwoHighScore,   // Game Two High Score
			profile.GameThreeHighScore, // Game Three High Score
			profile.QuizOneHighScore,   // Quiz One High Score
			profile.QuizTwoHighScore,   // Quiz Two High Score
			profile.QuizThreeHighScore, // Quiz Three High Score
			profile.IsAdmin,            // Is Admin
		)

		if err != nil {
			fmt.Print(err)
			http.Error(w, "Error creating profile in database", http.StatusInternalServerError)
			return
		}

		// Return success message
		response := ResponseMessage{
			Success: true,
			UserID:  -5, // You can update this later to return the actual inserted ID
			Message: "Profile created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func handleCheckAuth(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Read the userid cookie
        cookie, err := r.Cookie("userid")
        if err != nil || cookie.Value == "" {
            // No cookie or cookie is empty, user is not authenticated
            json.NewEncoder(w).Encode(ResponseMessage{
                Success: false,
                Message: "Not authenticated",
            })
            return
        }

        // Optionally, you can verify the cookie against your database
        // For example, check if the user exists based on the userid
        var userID int
        err = db.QueryRow("SELECT userID FROM Users WHERE userID = ?", cookie.Value).Scan(&userID)
        if err != nil {
            // User does not exist
            json.NewEncoder(w).Encode(ResponseMessage{
                Success: false,
                Message: "Not authenticated",
            })
            return
        }

        // If user exists, respond with success
        json.NewEncoder(w).Encode(ResponseMessage{
            Success: true,
            Message: "Authenticated",
        })
    }
}

func handleLogout(w http.ResponseWriter, r *http.Request) {
	// Clear the cookies by setting their expiration date in the past
	http.SetCookie(w, &http.Cookie{
		Name:   "userid",
		Value:  "",
		Path:   "/",
		Expires: time.Now().Add(-1 * time.Hour), // Expire the cookie
		HttpOnly: true,
		Secure: true, // Use true if serving over HTTPS
	})

	http.SetCookie(w, &http.Cookie{
		Name:   "gardenid",
		Value:  "",
		Path:   "/",
		Expires: time.Now().Add(-1 * time.Hour), // Expire the cookie
		HttpOnly: true,
		Secure: true, // Use true if serving over HTTPS
	})

	// Optionally return a response to indicate the logout was successful
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"success": true, "message": "Logged out successfully"}`))
}