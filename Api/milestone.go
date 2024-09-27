package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type Milestone struct {
	MilestoneID int    `json:"MilestoneID"`
	Name        string `json:"Name"`
	Description string `json:"Description"`
}

type CommunityMilestone struct {
	CommunityMilestoneID int       `json:"CommunityMilestoneID"`
	Status               int       `json:"Status"`
	Progress             int       `json:"Progress"`
	TimeCreated          time.Time `json:"TimeCreated"`
	FinishedAt           time.Time `json:"FinishedAt"`
	MilestoneID          int       `json:"MilestoneID"`
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

var personalMilestones []PersonalMilestone

// Gets all Users
func getMilestones(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {
		milestones, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())
			json.NewEncoder(w).Encode(milestones)
		}
	}

}

// Gets specific user based on ID
func getMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		milestones, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())
			json.NewEncoder(w).Encode(milestones)
		}
	}
	for _, item := range milestones {
		if strconv.Itoa(item.MilestoneID) == params["milestoneID"] {
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
	db := connectToDB()
	if db != nil {
		check, err := createMilestoneDB(newMilestone, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Printf("%d", check)

		json.NewEncoder(w).Encode(newMilestone)
	}
}

// Updates data relating to user
func updateMilestone(w http.ResponseWriter, r *http.Request) {

}

// Deletes a User
func DeleteMilestone(w http.ResponseWriter, r *http.Request) {

}

// Gets all Users
func getCommunityMilestones(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(communityMilestones)
}

// Gets specific user based on ID
func getCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range communityMilestones {
		if strconv.Itoa(item.CommunityMilestoneID) == params["MilestoneID"] {
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
		if strconv.Itoa(item.MilestoneID) == params["CommunityMilestoneID"] {
			communityMilestones = append(communityMilestones[:index], communityMilestones[index+1:]...)
			var milestone CommunityMilestone
			_ = json.NewDecoder(r.Body).Decode(&milestone)

			communityMilestones = append(communityMilestones, milestone)
			json.NewEncoder(w).Encode(milestones)
			return
		}

	}
	json.NewEncoder(w).Encode(personalMilestones)
}

// Deletes a User
func DeleteCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range communityMilestones {
		if strconv.Itoa(item.CommunityMilestoneID) == params["CommunityMilestoneID"] {
			communityMilestones = append(communityMilestones[:index], communityMilestones[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(personalMilestones)
}

// Gets all Users
func getPersonalMilestones(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(personalMilestones)
}

// Gets specific user based on ID
func getPersonalMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range personalMilestones {
		if strconv.Itoa(item.personalMilestoneID) == params["MilestoneID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&PersonalMilestone{})
}

// Creates a new user
func createPersonalMilestone(w http.ResponseWriter, r *http.Request) {
	var newMilestone PersonalMilestone
	_ = json.NewDecoder(r.Body).Decode(&newMilestone)
	personalMilestones = append(personalMilestones, newMilestone)
	json.NewEncoder(w).Encode(personalMilestones)
}

// Updates data relating to user
func updatePersonalMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range personalMilestones {
		if strconv.Itoa(item.milestoneID) == params["PersonalMilestoneID"] {
			personalMilestones = append(personalMilestones[:index], personalMilestones[index+1:]...)
			var milestone PersonalMilestone
			_ = json.NewDecoder(r.Body).Decode(&milestone)

			personalMilestones = append(personalMilestones, milestone)
			json.NewEncoder(w).Encode(milestones)
			return
		}

	}
	json.NewEncoder(w).Encode(personalMilestones)
}

// Deletes a User
func DeletePersonalMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range personalMilestones {
		if strconv.Itoa(item.personalMilestoneID) == params["PersonalMilestoneID"] {
			personalMilestones = append(personalMilestones[:index], personalMilestones[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(personalMilestones)
}

// Gets all users from the database
func getMilestonesDB(db *sql.DB) ([]Milestone, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [milestoneID], [name], [description] FROM Milestone`)

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

	var milestones []Milestone
	//Scans every row and converts it into a milestone struct to be returned
	for rows.Next() {
		var mID int
		var name, description string

		err := rows.Scan(&mID, &name, &description)
		if err != nil {
			return nil, err
		}
		newMilestone := Milestone{MilestoneID: mID, Name: name, Description: description}
		milestones = append(milestones, newMilestone)

	}

	return milestones, nil

}

// Creates  a New milestone in the db
func createMilestoneDB(newMilestone Milestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	// Custom SQL Selection Query
	//Insert command
	tsql := "INSERT INTO dbo.Milestone(milestoneID, name, description) VALUES (@p1, @p2, @p3)"

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}

	// Execute query
	insert, err := db.ExecContext(ctx, tsql, newMilestone.MilestoneID, newMilestone.Name, newMilestone.Description)
	//Error if
	if err != nil {
		fmt.Printf("Execution error")
		return -1, err

	}
	id, err := insert.RowsAffected()
	if err != nil {
		return -1, err
	}
	return id, nil

}

// Deletes a Milestone
func deleteMilestoneDB(milestoneId int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "DELETE FROM dbo.Milestone where milestoneID = @p1"
	delete, err := db.ExecContext(ctx, tsql, milestoneId)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil

}

// Gets all milestones within the DB
func ReadMilestoneDB(db *sql.DB) ([]Milestone, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [milestoneID], [name], [description] FROM Milestones`)

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

	var milestones []Milestone
	//Scans every row and converts it into a milestone struct to be returned
	for rows.Next() {
		var mID int
		var name, description string

		err := rows.Scan(&mID, &name, &description)
		if err != nil {
			return nil, err
		}
		newMilestone := Milestone{MilestoneID: mID, Name: name, Description: description}
		milestones = append(milestones, newMilestone)

	}

	return milestones, nil

}

func updateMilestoneDB(updateMs Milestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "UPDATE INTO Milestone ('name', 'description') VALUES(?, ?)"

	insert, err := db.ExecContext(ctx, tsql, updateMs.Name, updateMs.Description)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

func getCommunityMilestoneDB(db *sql.DB) ([]CommunityMilestone, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}
	tsql := (`SELECT [communityMilestoneID], [mileStoneId], [status], [progress], [dateCreated], [dateFinished] FROM CommunityMilestone`)
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
	var communityMilestones []CommunityMilestone
	defer rows.Close()
	//Scans every row and converts it into a milestone struct to be returned
	for rows.Next() {
		var cmID, mID, status, progress int
		var dateCreated, dateFinished time.Time

		err := rows.Scan(&cmID, &mID, &status, &progress, &dateCreated, &dateFinished)
		if err != nil {
			return nil, err
		}
		newMilestone := CommunityMilestone{CommunityMilestoneID: cmID, MilestoneID: mID, Status: status, Progress: progress, TimeCreated: dateCreated, FinishedAt: dateFinished}
		communityMilestones = append(communityMilestones, newMilestone)

	}
	return communityMilestones, nil
}
