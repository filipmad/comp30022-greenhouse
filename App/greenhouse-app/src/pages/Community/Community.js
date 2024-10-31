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
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');
	const [dateCreated, setDateCreated] = useState('');

	// Fetch the recent blog post
	const getRecentBlog = async () => {
		try {
			const response = await axios.post('http://localhost:8000/get-top-newspost', { title, author, text, dateCreated });
			setAuthor(response.data.author);
			setTitle(response.data.title);
			setText(response.data.text);
		} catch (error) {
			console.error('Error fetching recent blog:', error);
		}
	};

	// Fetch the polls data
	const getPolls = async () => {
		try {
			const response = await axios.post('http://localhost:8000/get-polls');

			const pollsData = response.data; 
			if (Array.isArray(pollsData) && pollsData != null) {
				setPolls(pollsData); // Update the polls state with the actual data
				console.log(response.data)
			} else if (!pollsData) {
				console.log("no array")
			}

			else {
				console.error('Expected an array but got:', pollsData);
			}
		} catch (error) {
			console.log('Error loading polls', error);
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
		getRecentBlog();
		getPolls(); // Fetch polls when the component mounts
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
				<ForumPost
				title={title}
				datePosted={"01/01/2002"}
				text={text}
				/>
				<ForumPost
				title={title}
				datePosted={"01/01/2002"}
				text={text}
				/>
				<ForumPost
				title={title}
				datePosted={"01/01/2002"}
				text={text}
				/>
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
