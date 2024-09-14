package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Garden struct {
	gardenID int
	treeAge  int
	userID   int
}
type Plant struct {
	PlantID  int    `json:"PlantID"`
	Age      int    `json:"Age"`
	Name     string `json:"Name"`
	GardenID int    `json:"GardenID"`
}

var plants []Plant

var garden Garden

// Gets all Users
func getPlants(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(plants)
}

// Gets specific user based on ID
func getPlant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range plants {
		if strconv.Itoa(item.PlantID) == params["PlantID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&Plant{})
}

// Creates a new user
func createPlant(w http.ResponseWriter, r *http.Request) {
	var newPlant Plant
	_ = json.NewDecoder(r.Body).Decode(&newPlant)

	plants = append(plants, newPlant)
	json.NewEncoder(w).Encode(plants)
}

// Updates data relating to user
func updatePlant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range plants {
		if strconv.Itoa(item.PlantID) == params["PlantID"] {
			plants = append(plants[:index], plants[index+1:]...)
			var plant Plant
			_ = json.NewDecoder(r.Body).Decode(&plant)
			plant.Age, _ = strconv.Atoi(params["Age"])
			plants = append(plants, plant)
			json.NewEncoder(w).Encode(plant)
			return
		}

	}
	json.NewEncoder(w).Encode(plants)
}

// Deletes a User
func DeletePlant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range plants {
		if strconv.Itoa(item.PlantID) == params["PlantID"] {
			plants = append(plants[:index], plants[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(plants)
}

func getGarden(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(garden)
}

func createGarden(w http.ResponseWriter, r *http.Request) {
	var newGarden Garden
	_ = json.NewDecoder(r.Body).Decode(&newGarden)
	newGarden.treeAge = 0
	garden = newGarden
	json.NewEncoder(w).Encode(garden)

}

func deleteGarden(w http.ResponseWriter, r *http.Request) {

}

func updateGarden(w http.ResponseWriter, r *http.Request) {

}
