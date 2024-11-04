package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/microsoft/go-mssqldb"
)

type Milestone struct {
	CommmunityMilestoneID int    `json:"id"`
	Status                string `json:"status"`
	Progress              int    `json:"progress"`
	Text                  string `json:"text"`
	Target                int    `json:"target"`
	AssociatedAudience    int    `json:"associatedAudience"`
	VisitedSite           string `json:"visitedSite"`
}

// updateProgress(db)
//
//	Called from a particular part of the site to query the database and
//	increased the visited amount of times to a milestone
func updateProgressForVisitedSite(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the incoming request body
		var request struct {
			VisitedSite string `json:"visitedSite"`
		}
		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to update the progress for matching records
		query := `
			UPDATE [dbo].[CommunityMilestone]
			SET progress = progress + 1
			WHERE visitedSite = ?
		`

		// Execute the update query
		result, err := db.Exec(query, request.VisitedSite)
		if err != nil {
			fmt.Println("Database error:", err)
			http.Error(w, "Failed to update progress", http.StatusInternalServerError)
			return
		}

		// Check how many rows were updated
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Failed to confirm update", http.StatusInternalServerError)
			return
		}

		// Send appropriate response based on rows affected
		if rowsAffected > 0 {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(fmt.Sprintf("Progress updated for %d matching milestones", rowsAffected)))
		} else {
			http.Error(w, "No matching milestones found", http.StatusNotFound)
		}
	}
}

func createCommunityMilestone(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var milestone Milestone

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&milestone); err != nil {
			fmt.Println("Error decoding JSON payload:", err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}


		// SQL query to insert a new milestone
		query := `
			INSERT INTO [dbo].[CommunityMilestone] 
				(status, progress, text, target, associatedAudience, visitedSite)
			VALUES 
				(?, ?, ?, ?, ?, ?)
		`

		// Execute the insert query
		_, err := db.Exec(query, milestone.Status, milestone.Progress, milestone.Text, milestone.Target, milestone.AssociatedAudience, milestone.VisitedSite)
		if err != nil {
			fmt.Println("Database error:", err)
			http.Error(w, "Failed to create milestone", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("Milestone created successfully"))
	}
}

func getAllCommunityMilestones(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// SQL query to select all milestones
		query := `
			SELECT 
				communityMilestoneID, status, progress, text, target, associatedAudience, visitedSite
			FROM 
				[dbo].[CommunityMilestone]
		`

		rows, err := db.Query(query)
		if err != nil {
			fmt.Println("Database error:", err)
			http.Error(w, "Failed to retrieve milestones", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var milestones []Milestone

		// Loop through the rows to collect each milestone
		for rows.Next() {
			var milestone Milestone
			if err := rows.Scan(&milestone.CommmunityMilestoneID, &milestone.Status, &milestone.Progress, &milestone.Text, &milestone.Target, &milestone.AssociatedAudience, &milestone.VisitedSite); err != nil {
				fmt.Println("Error scanning row:", err)
				http.Error(w, "Failed to scan milestone", http.StatusInternalServerError)
				return
			}
			milestones = append(milestones, milestone)
		}

		// Check for errors from iterating over rows
		if err := rows.Err(); err != nil {
			fmt.Println("Error iterating rows:", err)
			http.Error(w, "Failed to retrieve milestones", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the milestones as a JSON object
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(milestones); err != nil {
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}
}

func deleteCommunityMilestone(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the incoming request body
		var request struct {
			MilestoneID int `json:"milestoneID"`
		}

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to delete the community milestone with the given milestoneID
		query := `DELETE FROM [dbo].[CommunityMilestone] WHERE communityMilestoneID = ?`

		// Execute the delete query
		result, err := db.Exec(query, request.MilestoneID)
		if err != nil {
			http.Error(w, "Failed to delete milestone", http.StatusInternalServerError)
			print(err)
			return
		}

		// Check if a milestone was actually deleted
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Failed to confirm deletion", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "Milestone not found", http.StatusNotFound)
			return
		}

		// Respond with success if the milestone was deleted
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Milestone deleted successfully"))
	}
}