package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

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

var milestones []Milestone

var communityMilestones []CommunityMilestone

var personalMileStones []PersonalMilestone

// Gets all Users
func getMilestones(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(milestones)
}

// Gets specific user based on ID
func getMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range milestones {
		if strconv.Itoa(item.milestoneID) == params["ID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&Milestone{})
}

// Creates a new user
func createMilestone(w http.ResponseWriter, r *http.Request) {
	var newMilestone Milestone
	_ = json.NewDecoder(r.Body).Decode(&newMilestone)
	milestones = append(milestones, newMilestone)
	json.NewEncoder(w).Encode(milestones)
}

// Updates data relating to user
func updateMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range milestones {
		if strconv.Itoa(item.milestoneID) == params["MilestoneID"] {
			milestones = append(milestones[:index], milestones[index+1:]...)
			var milestone Milestone
			_ = json.NewDecoder(r.Body).Decode(&milestone)
			milestone.name = params["name"]
			milestone.description = params["description"]
			milestones = append(milestones, milestone)
			json.NewEncoder(w).Encode(milestones)
			return
		}

	}
	json.NewEncoder(w).Encode(milestones)
}

// Deletes a User
func DeleteMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range milestones {
		if strconv.Itoa(item.milestoneID) == params["MilestoneID"] {
			milestones = append(milestones[:index], milestones[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(milestones)
}

// Gets all Users
func getCommunityMilestones(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(communityMilestones)
}

// Gets specific user based on ID
func getCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range communityMilestones {
		if strconv.Itoa(item.communityMilestoneID) == params["MilestoneID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&CommunityMilestone{})
}

// Creates a new user
func createCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	var newMilestone CommunityMilestone
	_ = json.NewDecoder(r.Body).Decode(&newMilestone)
	communityMilestones = append(communityMilestones, newMilestone)
	json.NewEncoder(w).Encode(communityMilestones)
}

// Updates data relating to user
func updateCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range communityMilestones {
		if strconv.Itoa(item.milestoneID) == params["CommunityMilestoneID"] {
			communityMilestones = append(communityMilestones[:index], communityMilestones[index+1:]...)
			var milestone CommunityMilestone
			_ = json.NewDecoder(r.Body).Decode(&milestone)

			communityMilestones = append(communityMilestones, milestone)
			json.NewEncoder(w).Encode(milestones)
			return
		}

	}
	json.NewEncoder(w).Encode(milestones)
}

// Deletes a User
func DeleteCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range communityMilestones {
		if strconv.Itoa(item.communityMilestoneID) == params["CommunityMilestoneID"] {
			communityMilestones = append(communityMilestones[:index], communityMilestones[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(milestones)
}
