package main

import "fmt"

type UserNotFoundError struct {
	userID int
}

type MissingUsername struct {
	username string
}

type MissingPassword struct {
	password string
}

type UsernameExists struct {
	username string
}

type GardenNotFound struct {
	GardenID int
}

type FlowerNotFound struct {
	flowerID int
}

type ForumPostNotFound struct {
	forumPostId int
}
type MissingAuthor struct {
	AuthorId int
}
type MissingTitle struct {
	title string
}
type MissingText struct {
	text string
}
type optionOneMissing struct {
	text string
}
type optionTwoMissing struct {
	text string
}
type pollNotFound struct {
	pollID int
}
type commentNotFound struct {
	commentID int
}

func (e UserNotFoundError) Error() string {
	return fmt.Sprintf("user with ID %d not found", e.userID)
}

func (e MissingUsername) Error() string {
	return fmt.Sprintf("Missing Username")
}

func (e MissingPassword) Error() string {
	return fmt.Sprintf("Missing password")
}

func (e UsernameExists) Error() string {
	return fmt.Sprintf("%s is already being used", e.username)
}

func (e GardenNotFound) Error() string {
	return fmt.Sprintf("Garden can't be found")
}

func (e FlowerNotFound) Error() string {
	return fmt.Sprintf("Flower can't be found")
}

func (e ForumPostNotFound) Error() string {
	return fmt.Sprintf("Forum Post %d can't be found", e.forumPostId)
}

func (e MissingAuthor) Error() string {
	return fmt.Sprintf("Author %d can't be found", e.AuthorId)

}

func (e MissingTitle) Error() string {
	return fmt.Sprintf("Title is missing")

}

func (e MissingText) Error() string {
	return fmt.Sprintf("Text is missing")
}

func (e optionOneMissing) Error() string {
	return fmt.Sprintf("Option 1 is missing")
}

func (e optionTwoMissing) Error() string {
	return fmt.Sprintf("Option 2 is missing")
}

func (e pollNotFound) Error() string {
	return fmt.Sprintf("Poll %d can't be found", e.pollID)
}

func (e commentNotFound) Error() string {
	return fmt.Sprintf("Comment %d can't be found", e.commentID)
}
