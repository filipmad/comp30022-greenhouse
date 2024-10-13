package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")

	fmt.Println("Endpoint Hit: homePage")
}

// Handlers for CRUD functions for User Handlers
func userHandlers(router *mux.Router) {
	router.HandleFunc("/Users", getUsers).Methods("GET")
	router.HandleFunc("/Users/{ID}", getUser).Methods("GET")
	router.HandleFunc("/Users", createUser).Methods("POST")
	router.HandleFunc("/Users/{ID}", updateUser).Methods("PUT")
	router.HandleFunc("/Users/{ID}", DeleteUser).Methods("DELETE")
	router.HandleFunc("/Garden", getGarden).Methods("GET")
	router.HandleFunc("/Garden", createGarden).Methods("POST")
	router.HandleFunc("/Garden", updateGarden).Methods("PUT")
	router.HandleFunc("/Garden/{UserID}", deleteGarden).Methods("DELETE")
	router.HandleFunc("/Plant", getPlants).Methods("GET")
	router.HandleFunc("/Plant", createPlant).Methods("POST")
	router.HandleFunc("/Plant/{PlantID}", updatePlant).Methods("PUT")
	router.HandleFunc("/Plant/{PlantID}", DeletePlant).Methods("DELETE")
	router.HandleFunc("/Comment", getComment).Methods("GET")
	router.HandleFunc("/Comment", createComment).Methods("POST")
	router.HandleFunc("/Comment/{CommentID}", deleteComment).Methods("POST")
	router.HandleFunc("/NewsPost", getNewsPost).Methods("GET")
	router.HandleFunc("/NewsPost", createNewsPost).Methods("POST")
	router.HandleFunc("/NewsPost/{NewsPostID}", deleteNewsPost).Methods("DELETE")
	router.HandleFunc("/ForumPost", getForumPost).Methods("GET")
	router.HandleFunc("/ForumPost", createForumPost).Methods("POST")
	router.HandleFunc("/ForumPost/{PostID}", deleteForumPost).Methods("DELETE")
	router.HandleFunc("/Poll", getPoll).Methods("GET")
	router.HandleFunc("/Poll", createPoll).Methods("POST")
	router.HandleFunc("/Poll/{pollID}", deletePoll).Methods("DELETE")
	router.HandleFunc("/Milestone", getMilestones).Methods("GET")
	router.HandleFunc("/Milestone", createMilestone).Methods("POST")
	router.HandleFunc("/Milestone", updateMilestone).Methods("PUT")
	router.HandleFunc("/Milestone/{MilestoneID}", deleteMilestone).Methods("DELETE")
	router.HandleFunc("/PersonalMilestone", getPersonalMilestones).Methods("GET")
	router.HandleFunc("/PersonalMilestone", createPersonalMilestone).Methods("POST")
	router.HandleFunc("/PersonalMilestone", updatePersonalMilestone).Methods("PUT")
	router.HandleFunc("/PersonalMilestone/{PersonalMilestoneID}", DeletePersonalMilestone).Methods("DELETE")
	router.HandleFunc("/CommunityMilestone", getCommunityMilestones).Methods("GET")
	router.HandleFunc("/CommunityMilestone", createCommunityMilestone).Methods("POST")
	router.HandleFunc("/CommunityMilestone", updateCommunityMilestone).Methods("PUT")
	router.HandleFunc("/CommunityMilestone/{PersonalMilestoneID}", deleteCommunityMilestone).Methods("DELETE")

}

func handleRequests(router *mux.Router) {
	//Creates new mux router

	router.HandleFunc("/", homePage)
	userHandlers(router)
	// gardenHandlers(router)

}

func main() {
	router := mux.NewRouter()
	handleRequests(router)
	log.Fatal(http.ListenAndServe(":8081", router))
}
