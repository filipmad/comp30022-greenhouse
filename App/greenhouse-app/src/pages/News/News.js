import React, { useEffect, useState } from "react"; // Import useEffect
import axios from 'axios';
import "./News.css";

export default function News() {
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

	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// API Key and endpoint
	const API_KEY = 'f53a68759063421ea95f364052df870f';
	const API_URL = `https://newsapi.org/v2/everything?q=sustainability&apiKey=${API_KEY}`;

	const fetchNews = async () => {
		try {
			const response = await axios.get(API_URL);
			setArticles(response.data.articles.slice(0, 3));
		} catch (err) {
			setError(err);
			console.error('Error fetching news:', err);
		} finally {
			setLoading(false);
		}
	};


	useEffect(() => {
		getRecentBlog();
		fetchNews();
	}, []);

	return (
		<div className="newsContainer">
			<div className="blogSection">
				<h1>Weekly Blog</h1>
				<div className="blog">
					{/* Displaying the fetched blog post */}
					<h3>{title || "Loading..."}</h3>
					<h5>{author || "Loading..."}</h5>
					<p>{text || "Loading..."}</p>
				</div>
			</div>
			<div className="rightSection">
				<div className="trendingSection">
					<h1>Trending</h1>
					<div className="trendingItems">
						<div className="trendingItem">
							<h3>{title}</h3>
						</div>
						<div className="trendingItem">
							<h2>Trending News Story</h2>
							{/* Trending item 2 content goes here */}
						</div>
					</div>
				</div>
				<div className="newsSection">
					<h1>Other News</h1>
					<div className="newsItemsContainer">
						<button className="arrowButton leftArrow"></button>
						<div className="newsItems">
							{articles.map((article, index) => (
								<div className="newsItem">
									<h2>{article.title}</h2>
									<p>{article.description}</p>
									<a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
									<hr />
								</div>
							))}
						</div>
						<button className="arrowButton rightArrow"></button>
					</div>
				</div>
			</div>
		</div>
	);
}
