package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Garden struct {
	GardenID    int `json:"GardenID"`
	TreeAge     int `json:"TreeAge"`
	UserID      int `json:"UserID"`
	UserBalance int `json:"UserBalance"`
}
type Plant struct {
	PlantID  int    `json:"PlantID"`
	Age      int    `json:"Age"`
	Name     string `json:"Name"`
	GardenID int    `json:"GardenID"`
	Value    int    `json:"Value"`
	Position int    `json:"Position"`
}

// Gets all Plants
func getPlants(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			json.NewEncoder(w).Encode(plants)
		}

	}

}

// Gets specific plant based on plant ID
func getPlantByPlantID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		//For Every plant
		for _, item := range plants {
			if strconv.Itoa(item.PlantID) == params["PlantID"] {
				json.NewEncoder(w).Encode(item)
				return
			}
		}

		json.NewEncoder(w).Encode(&Plant{})
	}
}

// Get Plants by their garden ID
func getPlantByGardenID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		for _, item := range plants {
			if strconv.Itoa(item.GardenID) == params["GardenID"] {
				json.NewEncoder(w).Encode(item)

			}
			return
		}

		json.NewEncoder(w).Encode(&Plant{})
	}
}

// Creates a new Plant
func createPlant(w http.ResponseWriter, r *http.Request) {
	var newPlant Plant
	_ = json.NewDecoder(r.Body).Decode(&newPlant)
	db := connectToDB()
	if db != nil {

		check, err := createPlantsDB(newPlant, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Print(check)
		json.NewEncoder(w).Encode(newPlant)
	}

}

// Updates data relating to the Plant
func updatePlant(w http.ResponseWriter, r *http.Request) {
	var updatedPlant Plant
	_ = json.NewDecoder(r.Body).Decode(&updatedPlant)
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}
		for _, item := range plants {
			if item.PlantID == updatedPlant.PlantID {
				ID := updatedPlant.PlantID
				age := updatedPlant.Age
				name := updatedPlant.Name
				position := updatedPlant.Position
				if err != nil {
					log.Fatal(err.Error())
				}
				updatedPlant := Plant{PlantID: ID, Age: age, Name: name, Position: position}
				changed, err := updatePlantsDB(updatedPlant, db)
				if err != nil {
					fmt.Errorf(err.Error())
				}
				fmt.Print(changed)
			}

		}
		json.NewEncoder(w).Encode(plants)
	}
}

// Deletes a PLant
func DeletePlant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}
		for _, item := range plants {
			if strconv.Itoa(item.PlantID) == params["PlantID"] {
				ID, err := strconv.Atoi(params["PlantID"])

				if err != nil {
					log.Fatal(err.Error())
				}

				deletePlantDB(ID, db)
				break
			}

		}
	}

}

// Gets the Garden
func getGarden(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID, err := strconv.Atoi(params["UserID"])
	if err != nil {
		log.Fatal(err.Error())
	}
	db := connectToDB()
	if db != nil {
		gardens, err := readGardenDB(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		}
		json.NewEncoder(w).Encode(gardens)
	}
}

// Creates the Garden
func createGarden(w http.ResponseWriter, r *http.Request) {
	var newGarden Garden
	_ = json.NewDecoder(r.Body).Decode(&newGarden)

	db := connectToDB()
	if db != nil {

		check, err := createGardenDB(newGarden, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Printf("%d", check)
	}

}

// Deletes a Garden
func deleteGarden(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		ID, err := strconv.Atoi(params["UserID"])
		if err != nil {
			log.Fatal(err.Error())
		}

		deleteGardenDB(ID, db)

	}
}

// Update the Garden
func updateGarden(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var updateGarden Garden
	_ = json.NewDecoder(r.Body).Decode(&updateGarden)
	userID, err := strconv.Atoi(params["UserID"])
	if err != nil {
		log.Fatal(err.Error())
	}
	db := connectToDB()
	if db != nil {
		gardens, err := readGardenDB(db, userID)
		if err != nil {
			log.Fatal(err.Error())
		}

		for _, item := range gardens {

			if item.UserID == updateGarden.UserID {
				if err != nil {
					log.Fatal(err.Error())
				}
				updateGardenDB(updateGarden, db)
				break
			}
		}

	}
}

// Reads information from the Garden
func readGardenDB(db *sql.DB, userID int) ([]Garden, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT Garden.gardenID, Garden.treeAge, Garden.userID, Users.userBalance FROM Garden INNER JOIN Users on Garden.userID = Users.userID where Users.userID = @p1`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, userID)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var garden []Garden
	for rows.Next() {
		var gID, tAge, uID, userBalance int
		var newGarden Garden
		err := rows.Scan(&gID, &tAge, &uID, &userBalance)
		if err != nil {
			return nil, err
		}
		newGarden = Garden{GardenID: gID, TreeAge: tAge, UserID: uID, UserBalance: userBalance}
		garden = append(garden, newGarden)

	}

	return garden, nil
}

// Adds a new garden into the DB
func createGardenDB(garden Garden, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Garden(treeAge, userID) VALUES(@p1, @p2)"

	insert, err := db.ExecContext(ctx, tsql, garden.TreeAge, garden.UserID)
	if err != nil {
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		log.Fatal(err.Error())

	}
	return id, nil
}

// Modifies both a userID and age in the DB
func updateGardenDB(updated Garden, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Checks need to be implemented for both invalid values (negative vals, etc...)
	//SQL statement
	qsql := "UPDATE dbo.Users SET userBalance = @p1 WHERE Users.userID = @p2"
	tsql := " UPDATE dbo.Garden SET treeAge = @p1 WHERE gardenID = @p2"
	update, err := db.ExecContext(ctx, qsql, updated.UserBalance, updated.UserID)
	modified, err := db.ExecContext(ctx, tsql, updated.TreeAge, updated.GardenID)
	if err != nil {
		return -1, err
	}
	checkBalance, err := update.RowsAffected()
	check, err := modified.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check + checkBalance, nil
}

// Deletes Garden from DB based on userID
func deleteGardenDB(userID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Garden where userID = @p1", userID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

// Deletes a Specific Plant
func deletePlantDB(flowerID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Plant where plantID  = @p1", flowerID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

//Deletes All Plants within a garden

func deleteAllPlantDB(gardenID int, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	delete, err := db.ExecContext(ctx, "DELETE FROM Plant where gardenID = @p1", gardenID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check, nil
}

// Read all plants from DB
func readPlantsDB(db *sql.DB) ([]Plant, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [PlantID], [Age], [Name], [GardenID], [value], [position] FROM Plant`)

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
		var pID, pAge, gID, value, position int
		var name string
		var newPlant Plant
		err := rows.Scan(&pID, &pAge, &name, &gID, &value, &position)
		if err != nil {
			return nil, err
		}
		newPlant = Plant{PlantID: pID, Age: pAge, Name: name, GardenID: gID, Value: value, Position: position}
		plants = append(plants, newPlant)

	}

	return plants, nil

}

// Create Plants within the Database
func createPlantsDB(newPlant Plant, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.Plant(age, name, gardenID, Value, Position) VALUES(1, @p1, @p2, @p3, @p4)"
	insert, err := db.ExecContext(ctx, tsql, newPlant.Name, newPlant.GardenID, newPlant.Value, newPlant.Position)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

// Updates Plants within Database
func updatePlantsDB(updatePlant Plant, db *sql.DB) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	tsql := "UPDATE dbo.Plant SET age = @p1, name = @p2, position = @4 WHERE plantID = @p3"
	insert, err := db.ExecContext(ctx, tsql, updatePlant.Age, updatePlant.Name, updatePlant.PlantID, updatePlant.Position)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}
