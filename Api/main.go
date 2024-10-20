// package main

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"os"
// )
// func homePage(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "test")
// 	fmt.Println("test")
// }

// func handleRequests() {
// 	http.HandleFunc("/", homePage)
// 	port := os.Getenv("HTTP_PLATFORM_PORT")

// 	if port == "" {
// 		port = "10000"
// 	}

// 	log.Fatal(http.ListenAndServe(":"+port, nil))
// }

//	func main() {
//		handleRequests()
//	}
package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	//"github.com/gorilla/sessions"
	_ "github.com/microsoft/go-mssqldb" // Postgres driver
	"github.com/rs/cors"
)

type User struct {
	Username   string `json:"username"`
	Password   string `json:"password"`
	University string `json:"university"`
}

type ResponseMessage struct {
	Success bool   `json:"success"`
	UserID  int    `json:"userid"`
	Message string `json:"message"`
}

var (
	debug    = flag.Bool("debug", false, "enable debugging")
	server   = flag.String("server", "greenhouse-server.database.windows.net", "server IP")
	username = flag.String("username", "azureuser", "the database username")
	password = flag.String("password", "Greenhouse123.", "the database password")
	port     = flag.Int("port", 1433, "the database port")
	database = flag.String("db", "greenhouse-sql-db", "the db")
)

func handleUsernameCheck(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var input User

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if db == nil {
			print("db is nil")
			return
		}
		print("db is alive")

		var userID int

		// Use a parameterized query to avoid SQL injection risks
		err := db.QueryRow("SELECT userID FROM [Users] WHERE username = ? AND password = ?", input.Username, input.Password).Scan(&userID)

		if err != nil {
			if err == sql.ErrNoRows {
				// Username does not exist
				userID = -1
			} else {
				// Query failed
				http.Error(w, "Invalid username or password", http.StatusInternalServerError)
				return
			}
		}

		var response ResponseMessage
		if userID != -1 {
			response = ResponseMessage{
				Success: true,
				UserID:  userID,
				Message: "Login Success",
			}

		} else {
			response = ResponseMessage{
				Success: false,
				UserID:  userID,
				Message: "Login Failed",
			}
		}

		// Send the success/failure response back to the frontend
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func handleCreateProfile(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var profile User

		// Decode the incoming JSON from the frontend
		if err := json.NewDecoder(r.Body).Decode(&profile); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		query := (`INSERT INTO [Users] (username, password, profilePic, university, gameOneHighScore, gameTwoHighScore, gameThreeHighScore, quizOneHighScore, quizTwoHighScore, quizThreeHighScore, userBalance) 
		VALUES (?, ?, 'default_pic', ?, 0, 0, 0, 0, 0, 0, 0)`)

		// Insert the new profile into the database
		_, err := db.Exec(query,
			profile.Username, profile.Password, profile.University)

		if err != nil {
			http.Error(w, "Error creating profile in database", http.StatusInternalServerError)
			return
		}

		// Return success message
		response := ResponseMessage{
			Success: true,
			UserID:  -5,
			Message: "Profile created successfully",
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func main() {
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s", *server, *username, *password, *port, *database)

	if *debug {
		fmt.Printf(" connString:%s\n", connString)
	}

	// changed conn to db
	db, err := sql.Open("mssql", connString)

	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Printf("Connected!\n")

	r := mux.NewRouter()

	// Define the /check-username route
	r.HandleFunc("/check-username", handleUsernameCheck(db)).Methods("POST")
	r.HandleFunc("/create-profile", handleCreateProfile(db)).Methods("POST")

	// Set up CORS to allow requests from the React frontend
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Frontend origin
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Use the CORS middleware with the router
	handler := c.Handler(r)

	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))

}
