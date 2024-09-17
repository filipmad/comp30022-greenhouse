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
	tsql := (`SELECT [gardenID], [treeAge], [userID] FROM Garden`)

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

// Adds a new garden into the DB
func addGardenDB(userID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO Garden ('treeAge', 'userID') VALUES(0, ?)"
	insert, err := db.ExecContext(ctx, tsql, userID)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

// Modifies both a userID and age in the DB
func modifyGardenDB(age int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Checks need to be implemented for both invalid values (negative vals, etc...)
	//SQL statement
	tsql := "UPDATE INTO Garden ('treeAge' VALUES(?)"
	modified, err := db.ExecContext(ctx, tsql, age)
	if err != nil {
		return -1, err
	}
	check, err := modified.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil
}

// Deletes Garden from DB based on userID
func deleteGardenDB(userID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Garden where userID = ?", userID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

//Deletes a Specific Plant

func deletePlantDB(gardenID int, flowerID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Plant where gardenID = ?, flowerID  = ?", gardenID, flowerID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

//Deletes All Plants

func deleteAllPlantDB(gardenID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Plant where gardenID = ?", gardenID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

func getPlantsDB(gardenID int, db *sql.DB) ([]Plant, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [PlantID], [Age], [Name], [GardenID] FROM Plant`)

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

	var plants []Plant
	for rows.Next() {
		var pID, pAge, gID int
		var name string
		var newPlant Plant
		err := rows.Scan(&pID, &pAge, &name, &gID)
		if err != nil {
			return nil, err
		}
		newPlant = Plant{PlantID: pID, Age: pAge, Name: name, GardenID: gID}
		plants = append(plants, newPlant)

	}

	return plants, nil

}

func addPlantsDB(GardenID int, Name string, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO Plant ('Age', 'Name', 'GardenID') VALUES('1', ?, ?)"
	insert, err := db.ExecContext(ctx, tsql, Name, GardenID)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}
func UpdatePlantsDB(PlantID int, Age int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "UPDATE INTO Plant ('Age', 'PlantID') VALUES(?, ?)"
	insert, err := db.ExecContext(ctx, tsql, Age, PlantID)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}
