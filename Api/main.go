package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	ID             int    `json:"ID"`
	University     string `json:"University"`
	Username       string `json:"Username"`
	ProfilePicture string `json:"ProfilePicture"`
	Scores         *personalScore
}
type personalScore struct {
	HighScoreGame1 int
	HighScoreGame2 int
	HighScoreGame3 int
	HighScoreQuiz1 int
	HighScoreQuiz2 int
	HighScoreQuiz3 int
}

var Users []User

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func getUsers(w http.ResponseWriter, r *http.Request) {

	json.NewEncoder(w).Encode(Users)
}
func getUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

}
func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser)
	Users = append(Users, newUser)
	json.NewEncoder(w).Encode(newUser)
}

func updateScore(w http.ResponseWriter, r *http.Request) {

}

func handleRequests() {
	router := mux.NewRouter()
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(":8081", router))
}

func main() {
	Users = append(Users, User{ID: 1, University: "Testing University", Username: "test", ProfilePicture: "Picture"})
	handleRequests()
}
