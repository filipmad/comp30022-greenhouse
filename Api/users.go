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
	"github.com/microsoft/go-mssqldb/azuread"
)

type User struct {
	ID             string `json:"ID"`
	University     string `json:"University"`
	Username       string `json:"Username"`
	Password       string `json:"Password"`
	ProfilePicture string `json:"ProfilePicture"`
}

// Gets all Users
func getUsers(w http.ResponseWriter, r *http.Request) {
	db := connectToDB()
	if db != nil {

		users, err := ReadUsersDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}
		json.NewEncoder(w).Encode(users)

	}

}

// Gets specific user based on ID
func getUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	db := connectToDB()
	if db != nil {

		users, err := ReadUsersDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}
		for _, item := range users {

			if item.ID == params["ID"] {
				json.NewEncoder(w).Encode(item)
				return
			}

		}
		json.NewEncoder(w).Encode(&User{})
	}
}

// Creates a new user
func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser)
	db := connectToDB()
	if db != nil {
		fmt.Print("Good")
		check, err := CreateUsersDB(newUser, db)
		if err != nil {
			log.Fatal(err.Error())
		}
		fmt.Print(check)
	}
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
	db := connectToDB()
	if db != nil {
		users, err := ReadUsersDB(db)
		if err != nil {
			log.Fatal(err.Error())
		}
		for _, item := range users {
			if item.ID == params["ID"] {
				ID, err := strconv.Atoi(params["ID"])
				if err != nil {
					log.Fatal(err.Error())
				}

				deleteUsersDB(ID, db)
				break
			}

		}
	}

	json.NewEncoder(w).Encode(Users)
}

// Gets all users from the database
func ReadUsersDB(db *sql.DB) ([]User, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	// Custom SQL Selection Query
	//Needs to put in server
	tsql := (`SELECT [userID], [username], [password], [profilePic], [university] FROM Users`)

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

	var users []User
	//Scans every row and converts it into a user struct to be returned
	for rows.Next() {
		var uID int
		var username, password, profPic, uni string

		err := rows.Scan(&uID, &username, &password, &profPic, &uni)
		if err != nil {
			return nil, err
		}
		newUser := User{ID: strconv.Itoa(uID), Username: username, Password: password, ProfilePicture: profPic, University: uni}
		users = append(users, newUser)

	}

	return users, nil

}

// Creates a new user in the database
func CreateUsersDB(newUser User, db *sql.DB) (int64, error) {

	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	// Custom SQL Selection Query
	//Insert command
	tsql := "INSERT INTO dbo.Users(userID, username, password, profilePic, university, gameOneHighScore, gameTwoHighScore, gameThreeHighScore, 	quizOneHighScore, quizTwoHighScore, quizThreeHighScore) VALUES (@p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10, @p11)"

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}

	// Execute query
	insert, err := db.ExecContext(ctx, tsql, newUser.ID, newUser.Username, newUser.Password, newUser.ProfilePicture, newUser.University, 0, 0, 0, 0, 0, 0)
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

// Deletes a user from the database
func deleteUsersDB(userId int, db *sql.DB) (int64, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	tsql := "DELETE FROM dbo.Users where userID = @p1"
	delete, err := db.ExecContext(ctx, tsql, userId)
	if err != nil {
		return -1, err
	}
	check, err := delete.RowsAffected()
	if err != nil {
		return -1, err
	}

	return check, nil
}

// Connects to the Database and see whether the database is alive or not
func connectToDB() *sql.DB {
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s; port=%d; database =%s", server, username, password, port, database)
	log.Default()
	db, err := sql.Open(azuread.DriverName, connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	ctx := context.Background()
	db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Printf("Connected!\n")
	return db
}
