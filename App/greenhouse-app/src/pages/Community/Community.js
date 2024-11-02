import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import "./Community.css";
import { Button } from "react-bootstrap";
import ForumPost from "./components/ForumPosts";
import CommunityMilestone from "./components/CommunityMilestone";
import Poll from "./components/Poll";

export default function Community() {
	const [polls, setPolls] = useState([]);
	const [forumPosts, setForumPosts] = useState([]); // State to hold forum posts
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');
	const [dateCreated, setDateCreated] = useState('');

	// Fetch the recent blog post

	// Fetch the polls data
	const getPolls = async () => {
		try {
			const response = await axios.post('http://localhost:8000/get-polls');
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
			const response = await axios.get('http://localhost:8000/get-forumposts');
			setForumPosts(response.data); // Update forumPosts state with the fetched data
		} catch (error) {
			console.error('Error fetching forum posts:', error);
		}
	};

	// Handle voting
	const handleVote = async (pollId, option) => {
		try {
			// Find the poll that is being voted on
			const pollToUpdate = polls.find(poll => poll.pollID === pollId);

			// Create updated votes based on the option selected
			const updatedPoll = option === 'one'
				? { ...pollToUpdate, optionOneVotes: pollToUpdate.optionOneVotes + 1 }
				: { ...pollToUpdate, optionTwoVotes: pollToUpdate.optionTwoVotes + 1 };

			// Update the local state with the new vote count
			setPolls(polls.map(poll => (poll.pollID === pollId ? updatedPoll : poll)));

			// Send a request to the backend to update the vote count in the database
			await axios.post('http://localhost:8000/update-poll-votes', {
				pollID: pollId,
				option: option,
			});
		} catch (error) {
			console.error('Error updating vote:', error);
		}
	};

	useEffect(() => {
		getPolls(); // Fetch polls when the component mounts
		getForumPosts(); // Fetch forum posts when the component mounts
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
				<CommunityMilestone
					title={"Do This "}
					text={"do it for the people"}
					progress={31}
				/>
				<CommunityMilestone
					title={"Do This "}
					text={"do it for the people"}
					progress={31}
				/>
			</div>
		</div>
	);
}
