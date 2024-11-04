// Greenhouse Community Back End
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

var db *sql.DB




// Data Structs 
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

type Post struct {
	PostID          int       `json:"postID"`
	Title           string    `json:"title"`
	Text            string    `json:"text"`
	Likes           int       `json:"likes"`
	DatePosted      time.Time `json:"datePosted"`
	AuthorID        string    `json:"authorID"`
	CommentsEnabled int       `json:"commentsEnabled"`
}

type Comment struct {
	CommentID  int       `json:"commentID"`
	Text       string    `json:"text"`
	DatePosted time.Time `json:"datePosted"`
	PostID     int       `json:"postID"`
	Author     string    `json:"author"`
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

func uploadForumPost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input Post
		ctx := context.Background()

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			fmt.Println(err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Ensure the database connection is alive
		if err := db.PingContext(ctx); err != nil {
			http.Error(w, "Database connection error", http.StatusInternalServerError)
			return
		}

		// Retrieve userID from cookie
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		query := `INSERT INTO [dbo].[ForumPost]
				    (title, text, likes, datePosted, authorID, commentsEnabled)
				  VALUES
    				(?, ?, ?, GETDATE(), ?, ?)`

		// Insert the Forum Post
		_, err = db.ExecContext(ctx, query, input.Title, input.Text, input.Likes, userID, input.CommentsEnabled)
		if err != nil {
			http.Error(w, "Failed to insert Forum Post", http.StatusInternalServerError)
			return
		}

		// Prepare the success response
		response := ResponseMessage{
			Success: true,
			Message: "Forum Post created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func getForumPosts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Define the query to get all forum posts
		query := `SELECT 
					FP.postID,
					FP.title, 
					CONCAT(U.firstName, ' ', U.lastName) AS author, 
					FP.text, 
					FP.datePosted AS timeCreated,
					FP.commentsEnabled,
					FP.likes
				FROM 
					[dbo].[ForumPost] AS FP
				JOIN 
					[dbo].[Users] AS U ON FP.authorID = U.userID
				ORDER BY 
					FP.datePosted DESC;`

		// Execute the query to get multiple rows
		rows, err := db.Query(query)
		if err != nil {
			http.Error(w, "Failed to retrieve forum posts", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Slice to hold all forum posts
		var forumPosts []Post

		// Loop through the rows
		for rows.Next() {
			var forumPost Post
			var author string

			err := rows.Scan(
				&forumPost.PostID,
				&forumPost.Title,
				&author,
				&forumPost.Text,
				&forumPost.DatePosted,
				&forumPost.CommentsEnabled,
				&forumPost.Likes,
			)
			if err != nil {
				http.Error(w, "Failed to scan forum post", http.StatusInternalServerError)
				return
			}

			// Set the author field in the forumPost struct
			forumPost.AuthorID = author

			// Append each forum post to the forumPosts slice
			forumPosts = append(forumPosts, forumPost)
		}

		// Check for errors from iterating over rows
		if err = rows.Err(); err != nil {
			http.Error(w, "Failed to retrieve forum posts", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the list of forum posts as a JSON object
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(forumPosts); err != nil {
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}
}

func updateForumPosts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		//Parse the incoming request body
		var input Post
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// SQL query to update the appropriate vote count based on the option
		query := `
        UPDATE [dbo].[ForumPost]
        SET title = ?, text = ?, likes = ?, commentsEnabled = ?
        WHERE postID = ?;
    	`

		// Execute the update query
		_, err := db.Exec(query, input.Title, input.Text, input.Likes, input.CommentsEnabled, input.PostID)
		print(err)
		if err != nil {
			http.Error(w, "Failed to update Forum Post", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
}

func deleteForumPost(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the incoming request body
		var request struct {
			PostID int `json:"postID"`
		}

		if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Now delete comments associated with this post
		deleteCommentsQuery := `DELETE FROM [dbo].[Comment] WHERE postID = ?`
		_, err := db.Exec(deleteCommentsQuery, request.PostID)
		if err != nil {
			// Handle any errors that occur during the deletion of comments
			http.Error(w, "Failed to delete associated comments", http.StatusInternalServerError)
			return
		}

		// SQL query to delete the post with the given PostID
		deletePostQuery := `DELETE FROM [dbo].[ForumPost] WHERE postID = ?`

		// Execute the delete query for the forum post
		result, err := db.Exec(deletePostQuery, request.PostID)
		if err != nil {
			http.Error(w, "Failed to delete post", http.StatusInternalServerError)
			print(err)
			return
		}

		// Check if a post was actually deleted
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Failed to confirm deletion", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "Post not found", http.StatusNotFound)
			return
		}

		

		// Respond with success if the post and associated comments were deleted
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Post and associated comments deleted successfully"))
	}
}

func checkCommentForUser(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set response headers
		w.Header().Set("Content-Type", "application/json")

		// Parse the JSON body
		var comment Comment
		if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Retrieve userID from cookie
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		// Check if the user has commented on the post
		var exists int
		query := `SELECT CASE WHEN EXISTS(SELECT 1 FROM [dbo].[Comment] WHERE commentAuthorID = ? AND postID = ?) THEN 1 ELSE 0 END`
		err = db.QueryRow(query, userID, comment.PostID).Scan(&exists)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Respond with the result
		response := map[string]int{"hasCommented": exists}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	}
}

func uploadComment(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input Comment
		ctx := context.Background()

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			fmt.Println(err)
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Ensure the database connection is alive
		if err := db.PingContext(ctx); err != nil {
			http.Error(w, "Database connection error", http.StatusInternalServerError)
			return
		}

		// Retrieve userID from cookie
		cookie, err := r.Cookie("userid")
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		userID := cookie.Value

		query := `INSERT INTO [dbo].[Comment]
				    (text, datePosted, postID, commentAuthorID)
				  VALUES
    				(?, GETDATE(), ?, ?)`

		// Insert the Comment Post
		_, err = db.ExecContext(ctx, query, input.Text, input.PostID, userID)
		if err != nil {
			http.Error(w, "Failed to insert Comment Post", http.StatusInternalServerError)
			return
		}

		query = `SELECT CONCAT(firstName, ' ', lastName) AS fullName
				FROM [dbo].[Users]
				WHERE userID = ?;`

		var authorName string
		err = db.QueryRowContext(ctx, query, userID).Scan(&authorName)
		if err != nil {
			if err == sql.ErrNoRows {
				fmt.Println(err)
				return
			}
			fmt.Println(err)
			return
		}

		// Prepare the success response
		response := map[string]string{"authorName": authorName}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func getComments(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload RequestPayload
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			fmt.Println("Error decoding JSON payload:", err)
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		// Use the ID from the payload
		query := `SELECT 
                    CONCAT(u.firstName, ' ', u.lastName) AS Author, 
                    c.text,
                    c.datePosted
                FROM 
                    [dbo].[Comment] c
                JOIN 
                    [dbo].[Users] u ON c.commentAuthorID = u.userID
                WHERE 
                    c.postID = ?;`

		rows, err := db.Query(query, payload.ID)
		if err != nil {
			fmt.Println("Database error:", err)
			http.Error(w, "Failed to retrieve comments", http.StatusInternalServerError)
			return
		}
		defer rows.Close() // Ensure rows are closed after use

		var comments []Comment // Slice to hold multiple comments

		// Loop through the rows to get each comment
		for rows.Next() {
			var comment Comment
			if err := rows.Scan(&comment.Author, &comment.Text, &comment.DatePosted); err != nil {
				fmt.Println("Error scanning row:", err)
				http.Error(w, "Failed to scan comment", http.StatusInternalServerError)
				return
			}
			comments = append(comments, comment) // Add each comment to the slice
		}

		// Check for errors from iterating over rows
		if err := rows.Err(); err != nil {
			fmt.Println("Error iterating rows:", err)
			http.Error(w, "Failed to retrieve comments", http.StatusInternalServerError)
			return
		}

		// Set the response header and return the comments as a JSON object
		w.Header().Set("Content-Type", "application/json")
		// Wrap the comments in an object to prevent undefined issues on the frontend
		response := struct {
			Comments []Comment `json:"comments"`
		}{Comments: comments}

		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode the response", http.StatusInternalServerError)
			return
		}
	}
}
