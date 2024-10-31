package main

import (
	"context"
	"database/sql"
	"encoding/json"

	//"fmt"
	//"log"
	"net/http"

	_ "github.com/microsoft/go-mssqldb"
)

var db *sql.DB

// Poll struct to map poll data
type Poll struct {
	PollID             int    `json:"pollID"`
	Title              string `json:"title"`
	Text               string `json:"text"`
	OptionOneVotes     int    `json:"optionOneVotes"`
	OptionTwoVotes     int    `json:"optionTwoVotes"`
	OptionOneText      string `json:"optionOneText"`
	OptionTwoText      string `json:"optionTwoText"`
	TimeCreated        string `json:"timeCreated"`
	AssociatedAudience string `json:"associatedAudience"`
}

func uploadPoll(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input Poll
		ctx := context.Background()

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Ensure the database connection is alive
		if err := db.PingContext(ctx); err != nil {
			http.Error(w, "Database connection error", http.StatusInternalServerError)
			return
		}

		query := `INSERT INTO [dbo].[Poll]
				    (title, text, optionOneVotes, optionTwoVotes, optionOneText, optionTwoText, timeCreated, associatedAudience)
				  VALUES
    				(?, ?, 0, 0, ?, ?, GETDATE(), 'All')`

		// Insert the poll
		_, err := db.ExecContext(ctx, query, input.Title, input.Text, input.OptionOneText, input.OptionTwoText)
		if err != nil {
			http.Error(w, "Failed to insert poll", http.StatusInternalServerError)
			return
		}

		// Prepare the success response
		response := ResponseMessage{
			Success: true,
			Message: "Poll created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func getPolls(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Define the query to get all polls
		query := `SELECT pollID, title, text, optionOneVotes, optionTwoVotes, optionOneText, optionTwoText, timecreated
		          FROM [dbo].[Poll]
		          ORDER BY timeCreated DESC`

		// Execute the query to get multiple rows
		rows, err := db.Query(query)
		if err != nil {
			http.Error(w, "Failed to retrieve polls", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Slice to hold all polls
		var polls []Poll

		// Loop through the rows
		for rows.Next() {
			var poll Poll
			err := rows.Scan(&poll.PollID, &poll.Title, &poll.Text, &poll.OptionOneVotes, &poll.OptionTwoVotes, &poll.OptionOneText, &poll.OptionTwoText, &poll.TimeCreated)
			if err != nil {
				http.Error(w, "Failed to scan poll", http.StatusInternalServerError)
				return
			}
			// Append each poll to the polls slice
			polls = append(polls, poll)
		}

		// Check for errors from iterating over rows
		if err = rows.Err(); err != nil {
			http.Error(w, "Failed to retrieve polls", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the list of polls as a JSON object
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(polls); err != nil {
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}

}

func updatePollData(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//Parse the incoming request body
		var input Poll
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}
		

		// SQL query to update the appropriate vote count based on the option
		query := `
        UPDATE [dbo].[Poll]
        SET title = ?, text = ?, optionOneText = ?, optionTwoText = ?
        WHERE pollID = ?;
    	`

		// Execute the update query
		_, err := db.Exec(query, input.Title, input.Text, input.OptionOneText, input.OptionTwoText, input.PollID)
		print(err)
		if err != nil {
			http.Error(w, "Failed to update vote", http.StatusInternalServerError)			
			return
		}

		w.WriteHeader(http.StatusOK)
	}

}


func updatePollVotes(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//Parse the incoming request body
		var request struct {
			PollID int    `json:"pollID"`
			Option string `json:"option"`
		}
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to update the appropriate vote count based on the option
		query := ""
		if request.Option == "one" {
			query = `UPDATE [dbo].[Poll] SET optionOneVotes = optionOneVotes + 1 WHERE pollID = ?`
		} else if request.Option == "two" {
			query = `UPDATE [dbo].[Poll] SET optionTwoVotes = optionTwoVotes + 1 WHERE pollID = ?`
		} else {
			http.Error(w, "Invalid voting option", http.StatusBadRequest)
			return
		}

		// Execute the update query
		_, err := db.Exec(query, request.PollID)
		if err != nil {
			http.Error(w, "Failed to update vote", http.StatusInternalServerError)
			print(err)
			return
		}

		w.WriteHeader(http.StatusOK)
	}

}

func deletePoll(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Parse the incoming request body
        var request struct {
            PollID int `json:"pollID"`
        }

        if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
            http.Error(w, "Invalid request payload", http.StatusBadRequest)
            return
        }

        // SQL query to delete the poll with the given pollID
        query := `DELETE FROM [dbo].[Poll] WHERE pollID = ?`

        // Execute the delete query
        result, err := db.Exec(query, request.PollID)
        if err != nil {
            http.Error(w, "Failed to delete poll", http.StatusInternalServerError)
            print(err)
            return
        }

        // Check if a poll was actually deleted
        rowsAffected, err := result.RowsAffected()
        if err != nil {
            http.Error(w, "Failed to confirm deletion", http.StatusInternalServerError)
            return
        }

        if rowsAffected == 0 {
            http.Error(w, "Poll not found", http.StatusNotFound)
            return
        }

        // Respond with success if the poll was deleted
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Poll deleted successfully"))
    }
}
