package main

import "time"

type ForumPost struct {
	authorID   int
	postID     int
	title      string
	text       string
	likes      int
	datePosted time.Time
}

type Comment struct {
	commentID       int
	text            string
	datePosted      time.Time
	postID          int
	postAuthorID    int
	commentAuthorID int
}
