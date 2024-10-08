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
