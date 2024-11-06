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
	GardenID int `json:"GardenID"`
	TreeAge  int `json:"TreeAge"`
	UserID   int `json:"UserID"`
}
type Plant struct {
	PlantID  int    `json:"PlantID"`
	Age      int    `json:"Age"`
	Name     string `json:"Name"`
	GardenID int    `json:"GardenID"`
	Value    int    `json:"Value"`
	Position int    `json:"Position"`
}

type MovePlant struct {
	PositionOne int `json:"PositionOne"`

	PositionTwo int `json:"PositionTwo"`
}

// Get Plants by their garden ID
func getPlantByGardenID(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("gardenid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	db := connectToDB()
	var gardenID int
	gardenID, err = strconv.Atoi(cookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	if db != nil {
		plants, err := readPlantsDB(db, gardenID)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "Failed to get plant", http.StatusInternalServerError)

		}
		
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(plants)

	}
}

// Creates a new Plant
func createPlant(w http.ResponseWriter, r *http.Request) {
	var newPlant Plant
	_ = json.NewDecoder(r.Body).Decode(&newPlant)
	gardenCookie, err := r.Cookie("gardenid")
	userCookie, err := r.Cookie("userid")
	if err != nil || gardenCookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	db := connectToDB()
	var userID, gardenID int
	gardenID, err = strconv.Atoi(gardenCookie.Value)
	userID, err = strconv.Atoi(userCookie.Value)
	if db != nil {
		_, err := createPlantsDB(newPlant, db, userID, gardenID)
		if err != nil {
			http.Error(w, "Failed to create plant", http.StatusInternalServerError)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(newPlant)

	}

}

// Updates data relating to the Plant
func updatePlant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var updatedPlant MovePlant
	_ = json.NewDecoder(r.Body).Decode(&updatedPlant)
	cookie, err := r.Cookie("gardenid")

	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	var gardenID int
	gardenID, err = strconv.Atoi(cookie.Value)

	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	db := connectToDB()
	if db != nil {
		plants, err := readPlantsDB(db, gardenID)
		if err != nil {
			http.Error(w, "Failed to read plant", http.StatusInternalServerError)
		}
		for _, item := range plants {
			if item.Position == updatedPlant.PositionOne {
				if params["Type"] == "Move" {
					_, err := updatePlantsDB(updatedPlant, db, gardenID)
					if err != nil {
						http.Error(w, "Failed to update Plant", http.StatusInternalServerError)
					}
				} else if params["Type"] == "Swap" {
					_, err := swapPlantsDB(updatedPlant, db, gardenID)
					if err != nil {
						http.Error(w, "Failed to update Plant", http.StatusInternalServerError)
					}
				}

			}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(updatedPlant)
	}
}

// Deletes a Plant
func deletePlant(w http.ResponseWriter, r *http.Request) {

	db := connectToDB()
	var deletePlant Plant
	_ = json.NewDecoder(r.Body).Decode(&deletePlant)
	cookie, err := r.Cookie("gardenid")
	userCookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	//Convert the values together
	var gardenID int
	var userID int
	gardenID, err = strconv.Atoi(cookie.Value)
	userID, err = strconv.Atoi(userCookie.Value)
	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	if db != nil {
		plants, err := readPlantsDB(db, gardenID)
		if err != nil {
			http.Error(w, "Failed to read plant", http.StatusInternalServerError)
		}
		for _, item := range plants {
			if item.Position == deletePlant.Position {
				_, err := deletePlantDB(deletePlant, db, userID, gardenID)
				if err != nil {
					http.Error(w, "Failed to delete plant", http.StatusInternalServerError)
				}
				w.WriteHeader(http.StatusOK)
				json.NewEncoder(w).Encode(map[string]bool{"success": true})
				break
			}

		}
	}

}

// Gets the Garden
func getGarden(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("gardenid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	var gardenID int

	gardenID, err = strconv.Atoi(cookie.Value)

	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	db := connectToDB()
	if db != nil {
		gardens, err := readGardenDB(db, gardenID)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "Failed to read garden", http.StatusInternalServerError)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(gardens)
	}
}

// Creates the Garden
func createGarden(w http.ResponseWriter, r *http.Request) {
	var newGarden Garden

	_ = json.NewDecoder(r.Body).Decode(&newGarden)

	db := connectToDB()
	if db != nil {

		_, err := createGardenDB(newGarden, db)
		if err != nil {
			http.Error(w, "Failed to create garden", http.StatusInternalServerError)
		}

	}

}

// Deletes a Garden
func deleteGarden(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	var userID int

	userID, err = strconv.Atoi(cookie.Value)

	if err != nil {
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
	}
	db := connectToDB()
	if db != nil {
		_, err = deleteGardenDB(userID, db)
		if err != nil {
			http.Error(w, "Failed to delete garden", http.StatusInternalServerError)
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]bool{"success": true})
	}
}

// Update the Garden
func updateGarden(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("gardenid")
	var updateGarden Garden
	_ = json.NewDecoder(r.Body).Decode(&updateGarden)
	gardenID, err := strconv.Atoi(cookie.Value)
	if err != nil {
		log.Fatal(err.Error())
	}
	db := connectToDB()
	if db != nil {
		gardens, err := readGardenDB(db, gardenID)
		if err != nil {
			log.Fatal(err.Error())
		}

		for _, item := range gardens {
			if item.GardenID == gardenID {

				_, err = updateGardenDB(updateGarden, db, gardenID)
				if err != nil {
					http.Error(w, "Failed to update Garden", http.StatusInternalServerError)
				}
				response := map[string]interface{}{
					"success": true,
					"message": "Updated responses updated successfully",
				}
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(response)
				break
			}

		}

	}
}

// Reads information from the Garden
func readGardenDB(db *sql.DB, gardenID int) ([]Garden, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT gardenID, treeAge, userID FROM [dbo].[Garden] where gardenID = ?;`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, gardenID)
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
		newGarden = Garden{GardenID: gID, TreeAge: tAge, UserID: uID}
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
func updateGardenDB(updated Garden, db *sql.DB, gardenID int) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Checks need to be implemented for both invalid values (negative vals, etc...)
	//SQL statement

	tsql := " UPDATE dbo.Garden SET treeAge = @p1 WHERE gardenID = @p2"

	modified, err := db.ExecContext(ctx, tsql, updated.TreeAge, gardenID)
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
func deletePlantDB(plantDelete Plant, db *sql.DB, userID int, gardenID int) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	asql := (`UPDATE dbo.Users SET userBalance = userBalance + (@p1 * 0.5) where userID = @p2`)
	rows, err := db.ExecContext(ctx, asql, plantDelete.Value, userID)
	delete, err := db.ExecContext(ctx, "DELETE FROM Plant WHERE gardenID = @p1 AND position = @p2", gardenID, plantDelete.Position)

	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	checkbalance, err := rows.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check + checkbalance, nil
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
func readPlantsDB(db *sql.DB, gardenID int) ([]Plant, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [PlantID], [Age], [Name], [GardenID], [value], [position] FROM [dbo].[Plant] where GardenID = ?;`)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return nil, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql, gardenID)
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
func createPlantsDB(newPlant Plant, db *sql.DB, userID int, gardenID int) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	asql := (`UPDATE dbo.Users SET userBalance = userBalance - (@p1) where userID = @p2`)
	rows, err := db.ExecContext(ctx, asql, newPlant.Value, userID)
	if err != nil {
		return -1, err
	}
	tsql := "INSERT INTO dbo.Plant(age, name, gardenID, Value, Position) VALUES(1, @p1, @p2, @p3, @p4)"
	insert, err := db.ExecContext(ctx, tsql, newPlant.Name, gardenID, newPlant.Value, newPlant.Position)
	if err != nil {
		return -1, err

	}
	check, err := insert.RowsAffected()
	currencyCheck, err := rows.RowsAffected()
	if err != nil {
		return -1, err
	}
	return check + currencyCheck, nil

}

// Updates Plants within Database
func updatePlantsDB(updatePlant MovePlant, db *sql.DB, gardenID int) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	tsql := "UPDATE dbo.Plant SET position = @p1 WHERE position = @p2 AND gardenID = @p3"
	insert, err := db.ExecContext(ctx, tsql, updatePlant.PositionTwo, updatePlant.PositionOne, gardenID)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

func swapPlantsDB(updatePlant MovePlant, db *sql.DB, gardenID int) (int64, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	setup := "UPDATE dbo.Plant SET position = -1 WHERE position = @p1 AND gardenID = @p2"
	tsql := "UPDATE dbo.Plant SET position = @p1 WHERE position = @p2 AND gardenID = @p3"
	insert, err := db.ExecContext(ctx, setup, updatePlant.PositionOne, gardenID)
	insertTwo, err := db.ExecContext(ctx, tsql, updatePlant.PositionOne, updatePlant.PositionTwo, gardenID)
	insertThree, err := db.ExecContext(ctx, tsql, updatePlant.PositionTwo, -1, gardenID)
	if err != nil {
		return -1, err

	}
	checkIDOne, err := insert.LastInsertId()
	checkIDTwo, err := insertTwo.LastInsertId()
	checkIDThree, err := insertThree.LastInsertId()
	if err != nil {

	}
	return checkIDOne + checkIDTwo + checkIDThree, nil

}

// Gets all the coins
func fetchCoins(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userid")
	if err != nil || cookie.Value == "" {
		// No cookie or cookie is empty, user is not authenticated
		http.Error(w, http.ErrNoCookie.Error(), http.StatusForbidden)
		return
	}
	db := connectToDB()
	var userid int
	userid, err = strconv.Atoi(cookie.Value)

	if db != nil {
		userBalance, err := readUserBalanceDB(db, userid)
		if err != nil {
			http.Error(w, "User Balance couldn't be found", http.StatusInternalServerError)
		} else {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{"UserBalance": userBalance})
		}

	}
}

// Reads user balance
func readUserBalanceDB(db *sql.DB, userid int) (int, error) {
	ctx := context.Background()
	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	var userBalance int
	tsql := "`SELECT userBalance FROM users WHERE userID = @p1"
	read, err := db.QueryContext(ctx, tsql, userid)

	if err != nil {
		return -1, err

	}
	err = read.Scan(&userBalance)
	if err != nil {
		return -1, err

	}
	return userBalance, nil
}
