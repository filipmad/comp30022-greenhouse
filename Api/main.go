package main

import (
	"fmt"
	"log"
	"net/http"
)

type User struct {
	ID             int    `json:"ID"`
	University     string `json:"University"`
	Username       string `json:"Username"`
	ProfilePicture string `json:"ProfilePicture"`
}

var Users []User

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func main() {
	handleRequests()
}
