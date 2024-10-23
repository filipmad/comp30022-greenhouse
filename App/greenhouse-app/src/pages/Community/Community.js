import React, { useEffect, useState } from "react"; // Import useEffect
import axios from 'axios';
import "./Community.css";

export default function Community() {
	const [title, setTitle] = useState('d');
	const [author, setAuthor] = useState('');
	const [text, setText] = useState('');
	const [dateCreated, setDateCreated] = useState('');

	const getRecentBlog = async () => {
		try {
			const response = await axios.post('http://localhost:8000/get-top-newspost', { title, author, text, dateCreated });

			// Update the state with the fetched data
			setAuthor(response.data.author);
			setTitle(response.data.title);
			setText(response.data.text);


		} catch (error) {
			console.error('Error fetching recent blog:', error);
		}
	};

	

	useEffect(() => {
		getRecentBlog(); 
		
	}, []); 

	return (
		<div className="community-container">
			<div className="section polls">
				<h2>Polls</h2>
				<div className="element">Poll 1</div>
				<div className="element">Poll 2</div>
				<div className="element">Poll 3</div>
			</div>
			<div className="section posts">
				<h2>Top Posts</h2>
				<div className="element">
					<h3>{title}</h3>
					<h4>{author}</h4>
					<p>{text}</p>
				</div>
				<div className="element">Post 2</div>
				<div className="element">Post 3</div>
			</div>
			<div className="section milestones">
				<h2>Milestones</h2>
				<div className="element">Milestone 1</div>
				<div className="element">Milestone 2</div>
				<div className="element">Milestone 3</div>
			</div>
		</div>
	);
}