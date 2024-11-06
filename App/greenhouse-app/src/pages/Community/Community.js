import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Community.css";
import ForumPost from "./components/ForumPosts";
import CommunityMilestone from "./components/CommunityMilestone";
import Poll from "./components/Poll";
import config from "../../config";

export default function Community() {
	const [polls, setPolls] = useState([]);
	const [forumPosts, setForumPosts] = useState([]); // State to hold forum posts
	const [milestones, setMilestones] = useState([]);

	// Fetch the milestones
	const fetchMilestones = async () => {
		try {
			const response = await axios.get(`${config.deploymentUrl}/get-milestones`, { withCredentials: true });
			setMilestones(response.data);
		} catch (error) {
			console.error('Error fetching milestones:', error);
		}
	};

	// Fetch the polls data
	const getPolls = async () => {
		try {
			const response = await axios.post(`${config.deploymentUrl}/get-polls`);
			const pollsData = response.data;
			if (Array.isArray(pollsData) && pollsData != null) {
				setPolls(pollsData); // Update the polls state with the actual data
			} else {
				console.error('Expected an array but got:', pollsData);
			}
		} catch (error) {
			console.log('Error loading polls', error);
		}
	};

	// Fetch forum posts
	const getForumPosts = async () => {
		try {
			const response = await axios.get(`${config.deploymentUrl}/get-forumposts`);
			setForumPosts(response.data); // Update forumPosts state with the fetched data
		} catch (error) {
			console.error('Error fetching forum posts:', error);
		}
	};

	const handleVote = async (pollId, option) => {
		// Check if user has already voted in this poll
		const votedPolls = JSON.parse(localStorage.getItem('votedPolls')) || [];
		if (votedPolls.includes(pollId)) {

			return;
		}

		try {
			// Update vote count locally
			const pollToUpdate = polls.find(poll => poll.pollID === pollId);
			const updatedPoll = option === 'one'
				? { ...pollToUpdate, optionOneVotes: pollToUpdate.optionOneVotes + 1 }
				: { ...pollToUpdate, optionTwoVotes: pollToUpdate.optionTwoVotes + 1 };

			setPolls(polls.map(poll => (poll.pollID === pollId ? updatedPoll : poll)));

			// Update vote in the backend
			await axios.post(`${config.deploymentUrl}/update-poll-votes`, {
				pollID: pollId,
				option: option,
			});

			// Store the poll ID to mark as voted
			localStorage.setItem('votedPolls', JSON.stringify([...votedPolls, pollId]));

		} catch (error) {
			console.error('Error updating vote:', error);
		}
	};

	useEffect(() => {
		getPolls(); // Fetch polls when the component mounts
		getForumPosts(); // Fetch forum posts when the component mounts
		fetchMilestones();
	}, []);

	return (
		<div className="community-container">
			<div className="section polls">
				<h2>Community Polls</h2>
				{polls.length === 0 ? (
					<div className="element"><p>No polls uploaded</p></div>
				) : (
					polls.map(poll => (
						<Poll
							key={poll.pollID}
							poll={poll}
							handleVote={handleVote}
						/>
					))
				)}
			</div>

			<div className="section posts">
				<h2>Top Posts</h2>
				{forumPosts == null ? (
					<p>No forum posts available</p>
				) : (
					forumPosts.map(post => (
						<ForumPost
							key={post.postID} // Use post.postID for a unique key for each ForumPost
							postID={post.postID}
							title={post.title}
							datePosted={new Date(post.datePosted).toLocaleDateString()} // Assuming datePosted is part of the post
							text={post.text}
							likes={post.likes}
							commentsEnabled={post.commentsEnabled}
						/>
					))
				)}
			</div>


			<div className="section milestones">
				<h2>Community Milestones</h2>
				{milestones == null || milestones.length === 0 ? (
					<p>No milestones available.</p>
				) : (
					milestones.map((milestone) => (
						<CommunityMilestone
							key={milestone.id} // Use milestone.id for a unique key for each CommunityMilestone
							title={milestone.text} // Assuming text is the title you want to display
							text={`Target: ${milestone.target}`} // Custom text formatting as needed
							progress={milestone.progress} // Assuming you have a progress value in your milestone
							target={milestone.target} // Pass the target value for the ProgressBar
						/>
					))
				)}
			</div>
		</div>
	);
}
