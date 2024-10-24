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
	Status               string    `json:"Status"`
	Progress             int       `json:"Progress"`
	TimeCreated          time.Time `json:"TimeCreated"`
	FinishedAt           time.Time `json:"FinishedAt"`
	MilestoneID          int       `json:"MilestoneID"`
}

type PersonalMilestone struct {
	PersonalMilestoneID int       `json:"PersonalMilestoneID"`
	Status              string    `json:"Status"`
	Progress            int       `json:"Progress"`
	TimeCreated         time.Time `json:"TimeCreated"`
	FinishedAt          time.Time `json:"FinishedAt"`
	UserID              int       `json:"UserID"`
	MilestoneID         int       `json:"MilestoneID"`
}

// Gets all milestone
func getMilestones(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {
		milestones, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		json.NewEncoder(w).Encode(milestones)
	}

}

// Gets specific milestone based on ID
func getMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		milestones, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())
			for _, item := range milestones {
				if strconv.Itoa(item.MilestoneID) == params["milestoneID"] {
					json.NewEncoder(w).Encode(item)
					return
				}
			}
		}

	}

}

// Creates a new milestone
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
	var updateMilestone Milestone
	_ = json.NewDecoder(r.Body).Decode(&updateMilestone)

	db := connectToDB()
	if db != nil {
		milestones, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}

		for _, item := range milestones {

			if item.MilestoneID == updateMilestone.MilestoneID {

				if err != nil {
					log.Fatal(err.Error())
				}
				updateMilestoneDB(updateMilestone, db)
				break
			}
		}

	}
}

// Deletes a Milestone
func deleteMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		milestone, err := getMilestonesDB(db)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			for _, item := range milestone {
				if strconv.Itoa(item.MilestoneID) == params["milestoneID"] {

					deleteMilestoneDB(item.MilestoneID, db)
					break
				}

			}

		}

	}
}

// Gets all Community Milestones
func getCommunityMilestones(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {
		milestones, err := getCommunityMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		json.NewEncoder(w).Encode(milestones)
	}

}

// Gets specific Milestone based on MilestoneID
func getCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		communityMilestones, err := getCommunityMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		for _, item := range communityMilestones {
			if strconv.Itoa(item.CommunityMilestoneID) == params["MilestoneID"] {
				json.NewEncoder(w).Encode(item)
				return
			}

		}

	}
}

// Creates a new community milestone in the db
func createCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	var newMilestone CommunityMilestone
	_ = json.NewDecoder(r.Body).Decode(&newMilestone)
	db := connectToDB()
	if db != nil {
		check, err := createCommunityMilestoneDB(newMilestone, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Printf("%d", check)

		json.NewEncoder(w).Encode(newMilestone)
	}
}

// Updates data relating to Community Milestone
func updateCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	var updateCommunityMilestone CommunityMilestone
	_ = json.NewDecoder(r.Body).Decode(&updateCommunityMilestone)

	db := connectToDB()
	if db != nil {
		communityMilestones, err := getCommunityMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}

		for _, item := range communityMilestones {

			if item.CommunityMilestoneID == updateCommunityMilestone.CommunityMilestoneID {

				if err != nil {
					log.Fatal(err.Error())
				}
				updateCommunityMilestoneDB(updateCommunityMilestone, db)
				break
			}
		}

	}
}

// Deletes a Community Milestone based upon Community Milestone ID
func deleteCommunityMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		milestone, err := getCommunityMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			for _, item := range milestone {
				if strconv.Itoa(item.CommunityMilestoneID) == params["communityMilestoneID"] {
					communityMilestoneDeleteDB(item.CommunityMilestoneID, db)
					break
				}

			}

		}

	}
}

// Gets all Personal Milestones
func getPersonalMilestones(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {
		milestones, err := getCommunityMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())

		}
		json.NewEncoder(w).Encode(milestones)
	}
}

// Gets specific Personal Milestone based on ID
func getPersonalMilestone(w http.ResponseWriter, r *http.Request) {

}

// Creates a new Milestone
func createPersonalMilestone(w http.ResponseWriter, r *http.Request) {
	var newMilestone PersonalMilestone
	_ = json.NewDecoder(r.Body).Decode(&newMilestone)
	db := connectToDB()
	if db != nil {
		check, err := createPersonalMilestoneDB(newMilestone, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Printf("%d", check)

		json.NewEncoder(w).Encode(newMilestone)
	}
}

// Updates data relating to Personal Milestone
func updatePersonalMilestone(w http.ResponseWriter, r *http.Request) {

	var updateMilestone PersonalMilestone
	_ = json.NewDecoder(r.Body).Decode(&updateMilestone)

	db := connectToDB()
	if db != nil {
		milestones, err := getPersonalMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}

		for _, item := range milestones {

			if item.MilestoneID == updateMilestone.MilestoneID {

				if err != nil {
					log.Fatal(err.Error())
				}
				updatePersonalMilestoneDB(updateMilestone, db)
				break
			}
		}

	}
}

// Deletes a Personal Milestone based upon ID
func DeletePersonalMilestone(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {
		milestone, err := getPersonalMilestoneDB(db)
		if err != nil {
			log.Fatal(err.Error())
		} else {
			for _, item := range milestone {
				if strconv.Itoa(item.MilestoneID) == params["personalMilestoneID"] {
					deletePersonalMilestoneDB(item.UserID, item.MilestoneID, db)
					break
				}

			}

		}

	}
}

// Gets all Milestone from the database
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

// Creates a New milestone in the db
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

// Updates the details for a Milestones
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

// Gets all the community milestones
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
		var status string
		var cmID, mID, progress int
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

// Deletes a community Milestone
func communityMilestoneDeleteDB(communityMilestoneId int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "DELETE FROM dbo.CommunityMilestone where communityMilestoneID = @p1"
	delete, err := db.ExecContext(ctx, tsql, communityMilestoneId)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil
}

// Updates the details of a community milestone
func updateCommunityMilestoneDB(updateMs CommunityMilestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "UPDATE INTO CommunityMilestone ('status', 'progress', 'dateFinished') VALUES(?, ?, ?)"

	insert, err := db.ExecContext(ctx, tsql, updateMs.Status, updateMs.Progress, updateMs.FinishedAt)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

// Creates a New Community milestone in the db
func createCommunityMilestoneDB(newMilestone CommunityMilestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.CommunityMilestone(status, progress, timeCreated, milestoneID) VALUES (@p1, @p2, @p3, @p4)"

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}

	// Execute query
	insert, err := db.ExecContext(ctx, tsql, newMilestone.Status, newMilestone.Progress, time.Now(), newMilestone.MilestoneID)
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

// Deletes a Personal Milestone from the database
func deletePersonalMilestoneDB(userID int, milestoneID int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "DELETE FROM dbo.PersonalMilestone where userID = @p1 and milestoneID = @p2"
	delete, err := db.ExecContext(ctx, tsql, userID, milestoneID)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil

}

// Gets every personal milestone from the DB
func getPersonalMilestoneDB(db *sql.DB) ([]PersonalMilestone, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}
	tsql := (`SELECT [personalMilestoneID], [UserID], [mileStoneId], [status], [progress], [dateCreated], [dateFinished] FROM PersonalMilestone`)
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
	var personalMilestones []PersonalMilestone
	defer rows.Close()
	//Scans every row and converts it into a personal milestone struct to be returned
	for rows.Next() {
		var status string
		var pID, mID, uID, progress int
		var dateCreated, dateFinished time.Time

		err := rows.Scan(&pID, &mID, &status, &progress, &dateCreated, &dateFinished)
		if err != nil {
			return nil, err
		}
		newMilestone := PersonalMilestone{PersonalMilestoneID: pID, UserID: uID, MilestoneID: mID, Status: status, Progress: progress, TimeCreated: dateCreated, FinishedAt: dateFinished}
		personalMilestones = append(personalMilestones, newMilestone)

	}
	return personalMilestones, nil
}

// updates Personal Milestone in Database
func updatePersonalMilestoneDB(updateMs PersonalMilestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}
	//Command to delete Milestone
	tsql := "UPDATE INTO PersonalMilestone ('status', 'progress', 'dateFinished') VALUES(?, ?, ?)"

	insert, err := db.ExecContext(ctx, tsql, updateMs.Status, updateMs.Progress, updateMs.FinishedAt)
	if err != nil {
		return -1, err

	}
	id, err := insert.LastInsertId()
	if err != nil {

	}
	return id, nil

}

// Creates a New Personal milestone in the db
func createPersonalMilestoneDB(newMilestone PersonalMilestone, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "INSERT INTO dbo.PersonalMilestone(status, progress, timeCreated, milestoneID, userID) VALUES (@p1, @p2, @p3, @p4, @p5)"

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}

	// Execute query
	insert, err := db.ExecContext(ctx, tsql, newMilestone.Status, newMilestone.Progress, time.Now(), newMilestone.MilestoneID, newMilestone.UserID)
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
