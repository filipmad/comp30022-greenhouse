package main

import (
	"context"
	"database/sql"
	"fmt"
	"flag"
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
	r.HandleFunc("/create-profile", handleCreateProfile(db)).Methods("POST")
	
	r.HandleFunc("/create-newspost", uploadForumPost(db)).Methods("POST")
	r.HandleFunc("/get-top-newspost", getMostRecentPost(db))

	r.HandleFunc("/check-auth", handleCheckAuth(db)).Methods("GET")
	r.HandleFunc("/logout", handleLogout)
	r.HandleFunc("/update-user-details", updateUser(db)).Methods("POST")

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
