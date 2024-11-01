package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	//"github.com/gorilla/sessions"
	_ "github.com/microsoft/go-mssqldb" // Postgres driver
	"github.com/rs/cors"
)

var (
	debug    = flag.Bool("debug", false, "enable debugging")
	server   = flag.String("server", "greenhouse-server.database.windows.net", "server IP")
	username = flag.String("username", "azureuser", "the database username")
	password = flag.String("password", "Greenhouse123.", "the database password")
	port     = flag.Int("port", 1433, "the database port")
	database = flag.String("db", "greenhouse-sql-db", "the db")
)

func connectToDB() *sql.DB {
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%d;database=%s", *server, *username, *password, *port, *database)

	if *debug {
		fmt.Printf(" connString:%s\n", connString)
	}

	db, err := sql.Open("mssql", connString)
	// changed conn to db
	if err != nil {
		return db
	}
	return db
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
	r.HandleFunc("/get-profile-details", handleProfileDetails(db))
	r.HandleFunc("/create-profile", handleCreateProfile(db)).Methods("POST")
	r.HandleFunc("/delete-profile", handleDeleteProfile(db))
	r.HandleFunc("/get-admin-profiles", handleAdminProfiles(db))

	r.HandleFunc("/create-newsletter", uploadNewsletter(db)).Methods("POST")
	r.HandleFunc("/get-recent-newspost", getMostRecentPost(db))
	r.HandleFunc("/get-all-newsletters", getAllNewsletters(db))
	r.HandleFunc("/delete-newsletter", deleteNewsletter(db))
	r.HandleFunc("/update-newsletter", updateNewsletter(db)).Methods("POST")
	r.HandleFunc("/get-newsletter", getNewsLetterByID(db))

	r.HandleFunc("/check-auth", handleCheckAuth(db)).Methods("GET")
	r.HandleFunc("/logout", handleLogout)
	r.HandleFunc("/update-user-details", updateUser(db)).Methods("POST")

	r.HandleFunc("/add-poll", uploadPoll(db)).Methods("POST")
	r.HandleFunc("/get-polls", getPolls(db))
	r.HandleFunc("/update-poll-votes", updatePollVotes(db))
	r.HandleFunc("/update-poll", updatePollData(db)).Methods("POST")
	r.HandleFunc("/delete-poll", deletePoll(db))

	// r.HandleFunc("/polls", getPolls(db)).Methods("GET")        // Fetch all polls
	// r.HandleFunc("/polls/add", addPoll(db))     // Add a new poll
	// r.HandleFunc("/polls/update", updatePoll(db)) // Update an existing poll
	// r.HandleFunc("/polls/delete", deletePoll(db)) // Delete a poll

	// Set up CORS to allow requests from the React frontend
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Frontend origin
		AllowedMethods:   []string{"GET", "POST", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Use the CORS middleware with the router
	handler := c.Handler(r)

	log.Println("Starting server on :8000")
	log.Fatal(http.ListenAndServe(":8000", handler))

}
