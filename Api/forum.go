package main

import "time"

type ForumPost struct {
	AuthorID   int       `json:"AuthorID"`
	PostID     int       `json:"PostID"`
	Title      string    `json:"Title"`
	Text       string    `json:"Text"`
	Likes      int       `json:"Text"`
	DatePosted time.Time `json:"DatePosted"`
}

type Comment struct {
	CommentID       int       `json:"CommentID"`
	Text            string    `json:"Text"`
	DatePosted      time.Time `json:"DatePosted"`
	PostID          int       `json:"PostID"`
	PostAuthorID    int       `json:"PostAuthorID"`
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
