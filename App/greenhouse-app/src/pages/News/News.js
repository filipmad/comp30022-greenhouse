import React from "react";
import "./News.css";

export default function News() {
	return (
	  <div className="newsContainer">
		<div className="blogSection">
		  <h1>Weekly Blog</h1>
		  <div className="blog">
			{/* Blog content goes here */}
		  </div>
		</div>
		<div className="rightSection">
		  <div className="trendingSection">
			<h1>Trending</h1>
			<div className="trendingItems">
			  <div className="trendingItem">
				<h2>Trending Item 1</h2>
				{/* Trending item 1 content goes here */}
			  </div>
			  <div className="trendingItem">
				<h2>Trending Item 2</h2>
				{/* Trending item 2 content goes here */}
			  </div>
			</div>
		  </div>
		  <div className="newsSection">
			<h1>Other News</h1>
			<div className="newsItemsContainer">
			  <button className="arrowButton leftArrow"></button>
			  <div className="newsItems">
				<div className="newsItem">
				  <h2>News Item 1</h2>
				  {/* News item 1 content goes here */}
				</div>
				<div className="newsItem">
				  <h2>News Item 2</h2>
				  {/* News item 2 content goes here */}
				</div>
				<div className="newsItem">
				  <h2>News Item 3</h2>
				  {/* News item 3 content goes here */}
				</div>
				<div className="newsItem">
				  <h2>News Item 4</h2>
				  {/* News item 4 content goes here */}
				</div>
			  </div>
			  <button className="arrowButton rightArrow"></button>
			</div>
		  </div>
		</div>
	  </div>
	);
  }