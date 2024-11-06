package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

type ForumResponseMessage struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type ForumPost struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	Text        string    `json:"text"`
	DateCreated time.Time `json:"dateCreated"`
}

type ChangeRequest struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Text  string `json:"text"`
}

func uploadNewsletter(db *sql.DB) http.HandlerFunc {
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

		// Get the 'userid' cookie
		userIDCookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "User not authenticated", http.StatusUnauthorized)
			return
		}
		userID := userIDCookie.Value

		query := `INSERT INTO [dbo].[NewsPost] (title, authorID, text, timeCreated) VALUES (?, ?, ?, GETDATE());`

		// Insert the forum post
		_, err = db.ExecContext(ctx, query, input.Title, userID, input.Text)
		if err != nil {
			fmt.Println("Failed to insert post:", err)
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
		query := `SELECT TOP 1 
					np.title, 
					CONCAT(u.firstName, ' ', u.lastName) AS Author, 
					np.text, 
					np.timeCreated
				FROM 
					[dbo].[NewsPost] np
				JOIN 
					[dbo].[Users] u ON np.authorID = u.userID
				ORDER BY 
					np.timeCreated DESC;
				`

		var post ForumPost

		// Execute the query and scan the result into the ForumPost struct
		err := db.QueryRow(query).Scan(&post.Title, &post.Author, &post.Text, &post.DateCreated)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "No news post found", http.StatusNotFound)
			} else {
				fmt.Println(err)
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

func getAllNewsletters(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Define the query to get all news posts
		query := `SELECT 
					NP.newsPostID,
					NP.title, 
					CONCAT(U.firstName, ' ', U.lastName) AS author, 
					NP.text, 
					NP.timeCreated
				FROM 
					[dbo].[NewsPost] AS NP
				JOIN 
					[dbo].[Users] AS U ON NP.authorID = U.userID
				ORDER BY 
					NP.timeCreated DESC;`

		// Execute the query
		rows, err := db.Query(query)
		if err != nil {
			fmt.Println("Failed to execute query:", err)
			http.Error(w, "Failed to retrieve news posts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Slice to store all news posts
		var posts []ForumPost

		// Iterate over the rows
		for rows.Next() {
			var post ForumPost
			err := rows.Scan(&post.ID, &post.Title, &post.Author, &post.Text, &post.DateCreated)
			if err != nil {
				fmt.Println("Failed to scan row:", err)
				http.Error(w, "Failed to process news posts", http.StatusInternalServerError)
				return
			}
			posts = append(posts, post)
		}

		// Check for errors from iterating over rows
		if err = rows.Err(); err != nil {
			fmt.Println("Row iteration error:", err)
			http.Error(w, "Error iterating over news posts", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the posts as a JSON array
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(posts); err != nil {
			fmt.Println("Failed to encode response:", err)
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}
}

func deleteNewsletter(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the incoming request body
		var request struct {
			NewsletterID int `json:"newsletterID"`
		}

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			fmt.Println(err)
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		print(request.NewsletterID)

		// SQL query to delete the Newsletter with the given NewsletterID
		query := `DELETE FROM [dbo].[NewsPost] WHERE newsPostID = ?`

		// Execute the delete query
		result, err := db.Exec(query, request.NewsletterID)
		if err != nil {
			http.Error(w, "Failed to delete newsletter", http.StatusInternalServerError)
			print(err)
			return
		}

		// Check if a Newsletter was actually deleted
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Failed to confirm deletion", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "newsletter not found", http.StatusNotFound)
			return
		}

		// Respond with success if the poll was deleted
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("newsletter deleted successfully"))
	}
}

func updateNewsletter(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//Parse the incoming request integer
		var newsletter ChangeRequest
		if err := json.NewDecoder(r.Body).Decode(&newsletter); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to update the appropriate vote count based on the option
		query := `UPDATE [dbo].[NewsPost]
        SET title = ?, text = ?
        WHERE newsPostID = ?;`

		// Execute the update query
		_, err := db.Exec(query, newsletter.Title, newsletter.Text, newsletter.ID)
		if err != nil {
			http.Error(w, "Failed to update newsletter", http.StatusInternalServerError)
			print(err)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

// Define a struct that matches the JSON payload
type RequestPayload struct {
    ID int `json:"id"`
}

func getNewsLetterByID(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var payload RequestPayload
        if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
            fmt.Println("Error decoding JSON payload:", err)
            http.Error(w, "Invalid request payload", http.StatusBadRequest)
            return
        }

        // Use the ID from the payload
        query := `SELECT 
            np.title, 
            CONCAT(u.firstName, ' ', u.lastName) AS Author, 
            np.text, 
            np.timeCreated
        FROM 
            [dbo].[NewsPost] np
        JOIN 
            [dbo].[Users] u ON np.authorID = u.userID
        WHERE 
            np.newsPostID = ?;`

        var newsletter ForumPost

        // Execute the query and scan the result into the ForumPost struct
        err := db.QueryRow(query, payload.ID).Scan(&newsletter.Title, &newsletter.Author, &newsletter.Text, &newsletter.DateCreated)
        if err != nil {
            if err == sql.ErrNoRows {
                http.Error(w, "No news post found", http.StatusNotFound)
            } else {
                fmt.Println("Database error:", err)
                http.Error(w, "Failed to retrieve the news post", http.StatusInternalServerError)
            }
            return
        }

        // Set the response header and return the post as a JSON object
        w.Header().Set("Content-Type", "application/json")
        if err := json.NewEncoder(w).Encode(newsletter); err != nil {
            http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
            return
        }
    }
}

