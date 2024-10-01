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
	NewsPostID   int       `json:"NewsPostID"`
	Title        string    `json:"Title"`
	Author       string    `json:"Author"`
	Text         string    `json:"Text"`
	IsNewsLetter bool      `json:"IsNewsLetter"`
	Timecreated  time.Time `json:"TimeCreated"`
}

type Poll struct {
	PollID         int       `json:"PollID"`
	Title          string    `json:"Title"`
	Text           string    `json:"Text"`
	OptionOne      string    `json:"OptionOne"`
	OptionTwo      string    `json:"OptionTwo"`
	OptionOneVotes int       `json:"OptionOneVotes"`
	OptionTwoVotes int       `json:"OptionTwoVotes"`
	TimeCreated    time.Time `json:"TimeCreated"`
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

func updatePollDB(pollDetails Poll, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "UPDATE INTO Poll ('title', 'text', 'optionOneVotes', 'optionTwoVotes';, 'optionOneText', 'optionTwoText') VALUES(@p1, @p2, @p3, @p4, @p5) where pollID = @p6"
	insert, err := db.ExecContext(ctx, tsql, pollDetails.Title, pollDetails.Text, pollDetails.OptionOneVotes, pollDetails.OptionTwoVotes, pollDetails.OptionOne, pollDetails.OptionTwo, pollDetails.PollID)
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}

func readPollDB(db *sql.DB) ([]Poll, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}
	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [pollID], [title],[text], [optionOneVotes], [optionTwoVotes], [optionOneText], [optionTwoText], [timeCreated] FROM Poll`)

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

	var polls []Poll
	for rows.Next() {
		var pID, optionOneVotes, optionTwoVotes int
		var title, text, optionOneText, optionTwoText string
		var timeCreated time.Time
		var newPoll Poll
		err := rows.Scan(&pID, &title, &text, &optionOneVotes, &optionOneVotes, &optionOneText, &optionTwoText, &timeCreated)
		if err != nil {
			return nil, err
		}
		newPoll = Poll{PollID: pID, Title: title, Text: text, OptionOneVotes: optionOneVotes, OptionTwoVotes: optionTwoVotes, OptionOne: optionOneText, OptionTwo: optionTwoText, TimeCreated: timeCreated}
		polls = append(polls, newPoll)

	}

	return polls, nil
}

func deleteForumPostDB(forumID int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	tsql := "DELETE FROM dbo.ForumPost where forumID = @p1"

	delete, err := db.ExecContext(ctx, tsql, forumID)
	if err != nil {
		return -1, err

	}
	id, err := delete.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil

}

func createForumPostDB(newPost ForumPost, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.ForumPost (postID, title, text, likes, datePosted, authorID) VALUES(@p1, @p2, @p3, @p4, @p5, @p6)"

	insert, err := db.ExecContext(ctx, tsql, newPost.PostID, newPost.Title, newPost.Text, newPost.Likes, time.Now(), newPost.AuthorID)
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil

}

func readForumPostDB(db *sql.DB) ([]ForumPost, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}
	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [postID], [title],[text], [likes], [datePosted], [authorID] FROM ForumPost`)

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
	var forumPosts []ForumPost
	for rows.Next() {
		var newPost ForumPost
		var pId, likes, authorID int
		var title, text string
		var datePosted time.Time
		err := rows.Scan(&pId, &title, &text, &likes, &datePosted, &authorID)
		if err != nil {
			return nil, err
		}
		newPost = ForumPost{PostID: pId, Title: title, Text: text, Likes: likes, DatePosted: datePosted, AuthorID: authorID}
		forumPosts = append(forumPosts, newPost)

	}
	return forumPosts, nil
}

func updateForumPostDB(updatedPost ForumPost, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	tsql := "UPDATE INTO ForumPost ('title', 'text', 'likes', 'datePosted', 'authorID') VALUES(@p1, @p2, @p3, @p4, @p5) where postID = @p6"
	update, err := db.ExecContext(ctx, tsql, updatedPost.Title, updatedPost.Text, updatedPost.Likes, updatedPost.DatePosted, updatedPost.AuthorID)
	if err != nil {
		return -1, err

	}
	id, err := update.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}

func createNewsPostDB(newPost NewsPost, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	tsql := "INSERT INTO dbo.NewsPost (title, author, text, timeCreated) VALUES(@p1, @p2, @p3, @p4)"

	insert, err := db.ExecContext(ctx, tsql, newPost.Title, newPost.Author, newPost.Text, time.Now())
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil

}

func deleteNewsPostDB(deleteID int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "DELETE FROM dbo.NewsPost where newsPostID= @p1"
	delete, err := db.ExecContext(ctx, tsql, deleteID)
	if err != nil {
		return -1, err

	}
	check, err := delete.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return check, nil
}
