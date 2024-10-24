package main

import (
	"context"
	"database/sql"
	"encoding/json"

	"net/http"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

type ForumResponseMessage struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ForumPost struct {
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	Text        string    `json:"text"`
	DateCreated time.Time `json:"dateCreated"`
}

func uploadForumPost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input ForumPost
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

		query := `INSERT INTO [dbo].[NewsPost] (title, author, text, timeCreated) VALUES (?, ?, ?, GETDATE());`

		// Insert the forum post
		_, err := db.ExecContext(ctx, query, input.Title, input.Author, input.Text)
		if err != nil {
			http.Error(w, "Failed to insert forum post", http.StatusInternalServerError)
			return
		}

		// Prepare the success response
		response := ForumResponseMessage{
			Success: true,
			Message: "Post created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// Function to get the most recent news post
func getMostRecentPost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Define the query to get the most recent news post
		query := `SELECT TOP 1 title, author, text, timeCreated
		          FROM [dbo].[NewsPost]
		          ORDER BY timeCreated DESC`

		var post ForumPost

		// Execute the query and scan the result into the ForumPost struct
		err := db.QueryRow(query).Scan(&post.Title, &post.Author, &post.Text, &post.DateCreated)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "No news post found", http.StatusNotFound)
			} else {
				http.Error(w, "Failed to retrieve the most recent news post", http.StatusInternalServerError)
				//print(err)
			}
			return
		}

		// Set the response header and return the post as a JSON object
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(post); err != nil {
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			//print(err)
			return
		}
	}
}

