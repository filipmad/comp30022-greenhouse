package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
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
var gardens []Garden

// var garden []Garden
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

	var err error
	//Relevant server needs to be put in
	gardens, err = ReadGardenDB()
	if err != nil {
		//Shows relevant error
	}
	params := mux.Vars(r)
	for _, item := range gardens {
		if strconv.Itoa(item.userID) == params["userID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	//Needs to return error of no garden avaliable to user, for front end to display to log in
	json.NewEncoder(w).Encode(&Garden{})
}

func createGarden(w http.ResponseWriter, r *http.Request) {
	var newGarden Garden
	_ = json.NewDecoder(r.Body).Decode(&newGarden)
	newGarden.treeAge = 0
	gardens = append(gardens, newGarden)
	json.NewEncoder(w).Encode(gardens)

}

func deleteGarden(w http.ResponseWriter, r *http.Request) {

}

func updateGarden(w http.ResponseWriter, r *http.Request) {

}

func ReadGardenDB(db *sql.DB) ([]Garden, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [gardenID], [treeAge], [userID] FROM ...`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var garden []Garden
	for rows.Next() {
		var gID, tAge, uID int
		var newGarden Garden
		err := rows.Scan(&gID, &tAge, &uID)
		if err != nil {
			return nil, err
		}
		newGarden = Garden{gardenID: gID, treeAge: tAge, userID: uID}
		garden = append(garden, newGarden)

	}

	return garden, nil
}
