package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strconv"

	"net/http"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

type User struct {
	UserID             uint      `json:"userID"`
	FirstName          string    `json:"firstName"`
	LastName           string    `json:"lastName"`
	Email              string    `json:"email"`
	Password           string    `json:"password"`
	ProfilePic         string    `json:"profilePic"`
	University         string    `json:"university"`
	UserBalance        int       `json:"userBalance"`
	DateCreated        time.Time `json:"dateCreated"`
	GameOneHighScore   int       `json:"gameOneHighScore"`
	GameTwoHighScore   int       `json:"gameTwoHighScore"`
	GameThreeHighScore int       `json:"gameThreeHighScore"`
	QuizOneHighScore   int       `json:"quizOneHighScore"`
	QuizTwoHighScore   int       `json:"quizTwoHighScore"`
	QuizThreeHighScore int       `json:"quizThreeHighScore"`
	IsAdmin            int       `json:"isAdmin"`
}

type ResponseMessage struct {
	Success  bool   `json:"success"`
	UserID   int    `json:"userid"`
	GardenID int    `json:"gardenid"`
	IsAdmin  int    `json:"isadmin"`
	Message  string `json:"message"`
}

type UpdateUserRequest struct {
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Email      string `json:"email"`
	University string `json:"university"`
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

		// print(input.Email)
		// print(input.Password)

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
				HttpOnly: true,                           // Prevent JavaScript access
				Secure:   true,                           // Only send over HTTPS
			})

			http.SetCookie(w, &http.Cookie{
				Name:     "gardenid",
				Value:    strconv.Itoa(gardenID),
				Path:     "/",
				Expires:  time.Now().Add(24 * time.Hour), // 24-hour expiry
				HttpOnly: true,                           // Prevent JavaScript access
				Secure:   true,                           // Only send over HTTPS
			})

			response = ResponseMessage{
				Success:  true,
				UserID:   userID,
				GardenID: gardenID,
				Message:  "Login Success",
			}

		} else {

			response = ResponseMessage{
				Success:  false,
				UserID:   userID,
				GardenID: gardenID,
				Message:  "Login Failed",
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

		// Updated User db
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
			OUTPUT INSERTED.userid 
			VALUES 
			(?, ?, ?, ?, ?, ?, ?, CAST(GETDATE() AS DATE), ?, ?, ?, ?, ?, ?, ?);
			`

		// Prepare to execute the query and capture the new User ID
		var newUserID int64 // Change the type to match your database
		err := db.QueryRow(query,
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
		).Scan(&newUserID) // Use Scan to retrieve the new User ID

		if err != nil {
			fmt.Print(err)
			http.Error(w, "Error creating profile in database", http.StatusInternalServerError)
			return
		}

		// Insert a new garden using the userid
		query = `
			INSERT INTO [dbo].[Garden]
    			(
					[treeAge],
					[userID]
				)
				VALUES
				(
					1,
					?
				);`

		db.QueryRow(query, newUserID)

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
		var userID, isAdmin int
		err = db.QueryRow("SELECT userID, isAdmin FROM Users WHERE userID = ?", cookie.Value).Scan(&userID, &isAdmin)
		w.Header().Set("Content-Type", "application/json")
		if err != nil {
			// User does not exist
			json.NewEncoder(w).Encode(ResponseMessage{
				Success: false,
				IsAdmin: isAdmin,
				Message: "Not authenticated",
			})
			print(isAdmin)
			return
		}

		// If user exists, respond with success
		json.NewEncoder(w).Encode(ResponseMessage{
			Success: true,
			IsAdmin: isAdmin,
			Message: "Authenticated",
		})
	}
}

func handleLogout(w http.ResponseWriter, r *http.Request) {
	// Clear the cookies by setting their expiration date in the past
	http.SetCookie(w, &http.Cookie{
		Name:     "userid",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(-1 * time.Hour), // Expire the cookie
		HttpOnly: true,
		Secure:   true, // Use true if serving over HTTPS
	})

	http.SetCookie(w, &http.Cookie{
		Name:     "gardenid",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(-1 * time.Hour), // Expire the cookie
		HttpOnly: true,
		Secure:   true, // Use true if serving over HTTPS
	})

	// Optionally return a response to indicate the logout was successful
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"success": true, "message": "Logged out successfully"}`))
}

func updateUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the JSON request
		var userReq UpdateUserRequest
		err := json.NewDecoder(r.Body).Decode(&userReq)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Extract userID from cookie or session (this example assumes you have a cookie-based session)
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		// Use the globally defined `db` to update the user's details
		query := `
        UPDATE Users
        SET firstName = ?, lastName = ?, email = ?, university = ?
        WHERE userID = ?
    `
		_, err = db.Exec(query, userReq.FirstName, userReq.LastName, userReq.Email, userReq.University, userID)
		if err != nil {
			http.Error(w, "Failed to update user", http.StatusInternalServerError)
			return
		}

		// Respond with success
		response := map[string]interface{}{
			"success": true,
			"message": "User details updated successfully",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func handleAdminAuth(db *sql.DB) http.HandlerFunc {
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

		// For example, check if the user exists based on the userid
		var isAdmin int
		err = db.QueryRow("SELECT isAdmin from dbo.Users where userID = ?", cookie.Value).Scan(&isAdmin)
		if err != nil && isAdmin == 0 {
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

func handleDeleteProfile(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the email and password from the request body
		var credentials struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}
		if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Retrieve userID from cookie
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		// Delete associated records
		tx, err := db.Begin()
		if err != nil {
			http.Error(w, "Failed to begin transaction", http.StatusInternalServerError)
			return
		}
		defer tx.Rollback() // Rollback in case of any failure

		// Delete Plants associated with the user's garden
		_, err = tx.Exec("DELETE FROM dbo.Plant WHERE gardenID IN (SELECT gardenID FROM dbo.Garden WHERE userID = ?)", userID)
		if err != nil {
			http.Error(w, "Failed to delete plants", http.StatusInternalServerError)
			return
		}

		// Delete Garden associated with the user
		_, err = tx.Exec("DELETE FROM dbo.Garden WHERE userID = ?", userID)
		if err != nil {
			http.Error(w, "Failed to delete garden", http.StatusInternalServerError)
			return
		}

		// Delete User record
		_, err = tx.Exec("DELETE FROM dbo.Users WHERE userID = ?", userID)
		if err != nil {
			http.Error(w, "Failed to delete user", http.StatusInternalServerError)
			return
		}

		// Commit transaction
		if err = tx.Commit(); err != nil {
			http.Error(w, "Failed to commit transaction", http.StatusInternalServerError)
			return
		}

		// Respond with success
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
	}
}

func handleAdminProfiles(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		query := `SELECT userid, email, university FROM Users WHERE isAdmin = 1;`

		// Get Records of Admin Profiles
		rows, err := db.Query(query)
		if err != nil {
			fmt.Println("Failed to execute query:", err)
			http.Error(w, "Failed to retrieve admin accounts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Slice to store all news posts
		var users []User

		// Iterate over the rows
		for rows.Next() {
			var user User
			err := rows.Scan(&user.UserID, &user.Email, &user.University)
			if err != nil {
				fmt.Println("Failed to scan row:", err)
				http.Error(w, "Failed to process news posts", http.StatusInternalServerError)
				return
			}
			users = append(users, user)
		}

		// Check for errors from iterating over rows
		if err = rows.Err(); err != nil {
			fmt.Println("Row iteration error:", err)
			http.Error(w, "Error iterating over Admin Profiles", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the admin profiles as a JSON array
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(users); err != nil {
			fmt.Println("Failed to encode response:", err)
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}
}

func handleProfileDetails(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Retrieve userID from cookie
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		// Query to retrieve user details
		query := `SELECT firstName, lastName, email, university FROM Users WHERE userID = ?;`

		// Execute the query
		row := db.QueryRow(query, userID)
		
		// Initialize a UserProfile struct to hold the result
		var profile User

		// Scan the result into the struct
		err = row.Scan(&profile.FirstName, &profile.LastName, &profile.Email, &profile.University)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "User not found", http.StatusNotFound)
			} else {
				fmt.Println("Failed to retrieve profile details:", err)
				http.Error(w, "Failed to retrieve profile details", http.StatusInternalServerError)
			}
			return
		}

		// Set response content type to JSON
		w.Header().Set("Content-Type", "application/json")
		
		// Encode the profile as JSON and send the response
		err = json.NewEncoder(w).Encode(profile)
		if err != nil {
			fmt.Println("Failed to encode response:", err)
			http.Error(w, "Failed to send response", http.StatusInternalServerError)
			return
		}
	}
}