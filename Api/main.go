package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type User struct {
	ID             string `json:"ID"`
	University     string `json:"University"`
	Username       string `json:"Username"`
	ProfilePicture string `json:"ProfilePicture"`
}

type personalScore struct {
	HighScoreGame1 *score
	HighScoreGame2 *score
	HighScoreGame3 *score
	HighScoreQuiz1 *score
	HighScoreQuiz2 *score
	HighScoreQuiz3 *score
}

type score struct {
	ID    int
	score int
}

type forumPost struct {
	authorID   int
	postID     int
	title      string
	text       string
	likes      int
	datePosted time.Time
}

type comment struct {
	commentID       int
	text            string
	datePosted      time.Time
	postID          int
	postAuthorID    int
	commentAuthorID int
}

var Users []User

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")

	fmt.Println("Endpoint Hit: homePage")
}

// Gets all Users
func getUsers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Users)
}

// Gets specific user based on ID
func getUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range Users {
		if item.ID == params["ID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&User{})
}

// Creates a new user
func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser)
	Users = append(Users, newUser)
	json.NewEncoder(w).Encode(newUser)
}

// Updates data relating to user
func updateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range Users {
		if item.ID == params["ID"] {
			Users = append(Users[:index], Users[index+1:]...)
			var user User
			_ = json.NewDecoder(r.Body).Decode(&user)
			user.ID = params["ID"]
			Users = append(Users, user)
			json.NewEncoder(w).Encode(user)
			return
		}

	}
	json.NewEncoder(w).Encode(Users)
}

// Deletes a User
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range Users {
		if item.ID == params["ID"] {
			Users = append(Users[:index], Users[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(Users)
}

func userHandlers(router *mux.Router) {
	router.HandleFunc("/Users", getUsers).Methods("GET")
	router.HandleFunc("/Users/{ID}", getUser).Methods("GET")
	router.HandleFunc("/Users", createUser).Methods("POST")
	router.HandleFunc("/Users/{ID}", updateUser).Methods("PUT")
	router.HandleFunc("/Users/{ID}", DeleteUser).Methods("DELETE")
}

func handleRequests() {
	//Creates new mux router
	router := mux.NewRouter()
	router.HandleFunc("/", homePage)
	userHandlers(router)
	log.Fatal(http.ListenAndServe(":8081", router))

}

func main() {
	Users = append(Users, User{ID: "1", University: "Testing University", Username: "test", ProfilePicture: "Picture"})
	Users = append(Users, User{ID: "2", University: "Testing University2", Username: "test2", ProfilePicture: "Picture2"})
	handleRequests()
}
