package main

type Garden struct {
	gardenID int
	treeAge  int
	userId   int
}
type Plant struct {
	plantID  int
	age      int
	name     string
	gardenID int
}
