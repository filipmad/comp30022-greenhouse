package main

import "time"

type Milestone struct {
	milestoneID int
	name        string
	description string
}

type CommunityMilestone struct {
	communityMilestoneID int
	status               int
	progress             int
	timeCreated          time.Time
	finishedAt           time.Time
	milestoneID          int
}

type PersonalMilestone struct {
	personalMilestoneID int
	status              string
	progress            int
	timeCreated         time.Time
	finishedAt          time.Time
	userID              int
	milestoneID         int
}
