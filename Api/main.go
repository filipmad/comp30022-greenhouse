package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var Users []User

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")

	fmt.Println("Endpoint Hit: homePage")
}

func userHandlers(router *mux.Router) {
	router.HandleFunc("/Users", getUsers).Methods("GET")
	router.HandleFunc("/Users/{ID}", getUser).Methods("GET")
	router.HandleFunc("/Users", createUser).Methods("POST")
	router.HandleFunc("/Users/{ID}", updateUser).Methods("PUT")
	router.HandleFunc("/Users/{ID}", DeleteUser).Methods("DELETE")
}

func handleRequests() {
	//Creates new mux router
	router := mux.NewRouter()
	router.HandleFunc("/", homePage)
	userHandlers(router)
	log.Fatal(http.ListenAndServe(":8081", router))

}

func main() {
	Users = append(Users, User{ID: "1", University: "Testing University", Username: "test", ProfilePicture: "Picture"})
	Users = append(Users, User{ID: "2", University: "Testing University2", Username: "test2", ProfilePicture: "Picture2"})
	handleRequests()
}
