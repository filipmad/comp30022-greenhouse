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

	r.HandleFunc("/create-forumpost", uploadForumPost(db)).Methods("POST")
	r.HandleFunc("/get-forumposts", getForumPosts(db))
	r.HandleFunc("/update-forumposts", updateForumPosts(db)).Methods("POST")
	r.HandleFunc("/delete-forumpost", deleteForumPost(db))

	r.HandleFunc("/check-comments", checkCommentForUser(db))
	r.HandleFunc("/create-comment", uploadComment(db)).Methods("POST")
	r.HandleFunc("/get-comments", getComments(db))

	r.HandleFunc("/update-milestones-progress", updateProgressForVisitedSite(db)).Methods("POST")
	r.HandleFunc("/get-milestones", getAllCommunityMilestones(db))
	r.HandleFunc("/create-milestone", createCommunityMilestone(db)).Methods("POST")
	r.HandleFunc("/delete-milestone", deleteCommunityMilestone(db))

	r.HandleFunc("/Garden", getGarden).Methods("GET")
	r.HandleFunc("/Garden", createGarden).Methods("POST")
	r.HandleFunc("/Garden", updateGarden).Methods("PUT")
	r.HandleFunc("/Garden/{UserID}", deleteGarden).Methods("DELETE")

	r.HandleFunc("/Plant", getPlantByGardenID).Methods("GET")
	r.HandleFunc("/Plant", createPlant).Methods("POST")
	r.HandleFunc("/Plant/{Type}", updatePlant).Methods("PATCH")
	r.HandleFunc("/Plant", deletePlant).Methods("DELETE")

	r.HandleFunc("/Game/{gameType}/{crosswordID}", getScores).Methods("GET")
	r.HandleFunc("/Game/EcoAdventure", updateEcoAdventure).Methods("PATCH")
	r.HandleFunc("/Game/Crossword/{userID}", updateCrossword).Methods("PATCH")
	r.HandleFunc("/Game/Crossword/{userID}", insertCrosswordCompletion).Methods("POST")
	r.HandleFunc("/Game/CityScape", updateCityScape).Methods("PATCH")
	r.HandleFunc("/Game/Quiz1/{userID}", UpdateQuiz1Score).Methods("PATCH")
	r.HandleFunc("/Game/Quiz2/{userID}", UpdateQuiz2Score).Methods("PATCH")
	r.HandleFunc("/Game/Quiz3/{userID}", UpdateQuiz3Score).Methods("PATCH")

	// Set up CORS to allow requests from the React frontend
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://greenhouse-app-deployment-f7avhccxfaa3ewhp.australiasoutheast-01.azurewebsites.net"}, // Frontend origin
		AllowedMethods:   []string{"GET", "POST", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Use the CORS middleware with the router
	handler := c.Handler(r)

	log.Println("Starting server on :8000")
	err = http.ListenAndServe(":8000", handler)
	log.Fatal(err)

}
