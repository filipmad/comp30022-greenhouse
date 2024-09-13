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

type PersonalScore struct {
	HighScoreGame1 *Score
	HighScoreGame2 *Score
	HighScoreGame3 *Score
	HighScoreQuiz1 *Score
	HighScoreQuiz2 *Score
	HighScoreQuiz3 *Score
}

type Score struct {
	ID    int
	score int
}

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
type Plant struct {
	plantID  int
	age      int
	name     string
	gardenID int
}

type Garden struct {
	gardenID int
	treeAge  int
	userId   int
}

type Milestone struct {
	milestoneID int
	name        string
	description string
}

type CommunityMilestone struct {
	communityMilestoneID int
	status               int
	progress             int
	timeCreated          time.Time
	finishedAt           time.Time
	milestoneID          int
}

type PersonalMilestone struct {
	personalMilestoneID int
	status              string
	progress            int
	timeCreated         time.Time
	finishedAt          time.Time
	userID              int
	milestoneID         int
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
