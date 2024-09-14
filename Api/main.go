package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/microsoft/go-mssqldb"
)

type User struct {
	id             int `json:"id"`
	university     string `json:"university"`
	username       string `json:"username"`
	profilepic 	   string `json:"profilepic"`
	//Scores      *personalScore
}
type personalScore struct {
	HighScoreGame1 int
	HighScoreGame2 int
	HighScoreGame3 int
	HighScoreQuiz1 int
	HighScoreQuiz2 int
	HighScoreQuiz3 int
}

var Users []User

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")

	fmt.Println("Endpoint Hit: homePage")
}

// Read Function
// Read from AzureSQL and parse data into a list of LogEntry objects
func ReadTable(db *sql.DB) (int, error) {
	ctx := context.Background()

	// Check if database is alive.
	err := db.PingContext(ctx)
	if err != nil {
		return -1, err
	}

	// Custom SQL Selection Query
	tsql := (``)

	// Check Validity of the db
	if db == nil {
		fmt.Printf("db is invalid\n")
		var err error
		return -1, err
	}

	// Execute query
	rows, err := db.QueryContext(ctx, tsql)
	if err != nil {
		return -1, err
	}

	defer rows.Close()

	var count int
	Users = nil
	// Iterate through the result set.
	for rows.Next() {
		var id int
		var university, username, profilepic string

		// Get values from row.
		err := rows.Scan(&id, &university, &username, &profilepic)
		if err != nil {
			return -1, err
		}
 
		newUser := User{id: id, university: university, profilepic: profilepic}
		Users = append(Users, newUser)

		count++
	}

	return count, nil

}

// Gets all Users
func getUsers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Users)
}

// Gets specific user based on ID
func getUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range Users {
		if item.ID == params["ID"] {
			json.NewEncoder(w).Encode(item)
			return
		}

	}
	json.NewEncoder(w).Encode(&User{})
}

// Creates a new user
func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser User
	_ = json.NewDecoder(r.Body).Decode(&newUser)
	Users = append(Users, newUser)
	json.NewEncoder(w).Encode(newUser)
}

// Updates data relating to user
func updateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range Users {
		if item.id == params["id"] {
			Users = append(Users[:index], Users[index+1:]...)
			var user User
			_ = json.NewDecoder(r.Body).Decode(&user)
			user.id = params["ID"]
			Users = append(Users, user)
			json.NewEncoder(w).Encode(user)
			return
		}

	}
	json.NewEncoder(w).Encode(Users)
}

func testUsers(router *mux.Router) {
	router.HandleFunc("/Users", getUsers).Methods("GET")
	router.HandleFunc("/Users/{ID}", getUser).Methods("GET")
	router.HandleFunc("/Users", createUser).Methods("POST")
	router.HandleFunc("/Users/{ID}", updateUser).Methods("PUT")
}

func handleRequests() {
	//Creates new mux router
	router := mux.NewRouter()
	router.HandleFunc("/", homePage)
	testUsers(router)
	log.Fatal(http.ListenAndServe(":8081", router))

}

func main() {
	handleRequests()
}
// package main

// import (
// 	"encoding/json"
// 	"log"
// 	"net/http"
// )

// type Todo struct {
// 	ID        string `json:"id"`
// 	Title     string `json:"title"`
// 	Completed bool   `json:"completed"`
// }


// // SQL Request
// var todos = [1]Todo{{"123", "Mr", true}}

// func main() {
// 	// Define routes
// 	http.HandleFunc("/todos", getTodos)

// 	// Start the server
// 	log.Fatal(http.ListenAndServe(":8080", nil))
// }

// func getTodos(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(todos)
// }
