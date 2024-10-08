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

type gardenNotFound struct {
	GardenID int
}

type flowerNotFound struct {
	flowerID int
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

func (e gardenNotFound) Error() string {
	return fmt.Sprintf("Garden can't be found")
}

func (e flowerNotFound) Error() string {
	return fmt.Sprintf("Flower can't be found")
}
