package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	ID             string `json:"ID"`
	University     string `json:"University"`
	Username       string `json:"Username"`
	ProfilePicture string `json:"ProfilePicture"`
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
	for index, item := range Users {
		if item.ID == params["ID"] {
			Users = append(Users[:index], Users[index+1:]...)
			break
		}

	}
	json.NewEncoder(w).Encode(Users)
}
