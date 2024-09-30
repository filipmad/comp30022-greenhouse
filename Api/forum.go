package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"
)

type ForumPost struct {
	AuthorID   int       `json:"AuthorID"`
	PostID     int       `json:"PostID"`
	Title      string    `json:"Title"`
	Text       string    `json:"Text"`
	Likes      int       `json:"Likes"`
	DatePosted time.Time `json:"DatePosted"`
}

type Comment struct {
	CommentID       int       `json:"CommentID"`
	Text            string    `json:"Text"`
	DatePosted      time.Time `json:"DatePosted"`
	PostID          int       `json:"PostID"`
	CommentAuthorID int       `json:"CommentAuthorID"`
}

type NewsPost struct {
	NewsPostID   int       `json:"CommentID"`
	Title        string    `json:"Title"`
	Author       string    `json:"Author"`
	Text         string    `json:"Text"`
	IsNewsLetter bool      `json:"IsNewsLetter"`
	Timecreated  time.Time `json:"TimeCreated"`
}

type Poll struct {
	PollID         int    `json:"PollID"`
	Title          string `json:"Title"`
	Text           string `json:"Text"`
	OptionOne      string `json:"OptionOne"`
	OptionTwo      string `json:"OptionTwo"`
	OptionOneVotes int    `json:"OptionOneVotes"`
	OptionTwoVotes int    `json:"OptionTwoVotes"`
}

func getCommentDB(db *sql.DB) ([]Comment, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT commentID, text, datePosted, postID, commentAuthorID FROM Comment`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var comments []Comment
	for rows.Next() {
		var cID, pID, caID int
		var text string
		var newComment Comment
		var datePosted time.Time
		err := rows.Scan(&cID, &text, &datePosted, &pID, &caID)
		if err != nil {
			return nil, err
		}
		newComment = Comment{CommentID: cID, Text: text, DatePosted: datePosted, PostID: pID, CommentAuthorID: caID}
		comments = append(comments, newComment)

	}

	return comments, nil
}

func createCommentDB(newComment Comment, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Comment(text, datePosted, postID, commentAuthorID) VALUES(@p1, @p2, @p3, @p4)"

	insert, err := db.ExecContext(ctx, tsql, newComment.Text, newComment.DatePosted, newComment.PostID, newComment.CommentAuthorID)
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}

func deleteCommentDB(commentID int, postID int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Comment
	tsql := "DELETE FROM dbo.Comment where commentID = @p1 and postID = @p2"
	delete, err := db.ExecContext(ctx, tsql, commentID, postID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil
}

func createPollDB(newPoll Poll, db *sql.DB) (int64, error) {
	ctx := context.Background()

	tsql := "INSERT INTO dbo.Polls (title, text, optionOneVotes, OptionTwoVotes, OptionOneText, OptionTwoText, timeCreated) VALUES(@p1, @p2, @p3, @p4, @p5, @p6)"

	insert, err := db.ExecContext(ctx, tsql, newPoll.Title, newPoll.Text, newPoll.OptionOneVotes, newPoll.OptionTwoVotes, newPoll.OptionOneVotes, newPoll.OptionTwo, time.Now())
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}

func deletePollDB(newPoll Poll, db *sql.DB) (int64, error) {
	ctx := context.Background()

	tsql := "DELETE FROM dbo.Poll where pollID = @p1"

	insert, err := db.ExecContext(ctx, tsql, newPoll.PollID)
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}
