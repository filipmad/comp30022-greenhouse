import React, { useEffect, useState } from "react";
import "./Home.css";
import PrimaryBox from "./HomeComponents/PrimaryBox/PrimaryBox";
import axios from "axios"; 

export default function Home() {
  // State to store trending articles
  const [trendingArticles, setTrendingArticles] = useState([]);

  // Fetch trending articles 
  useEffect(() => {
    async function fetchTrendingArticles() {
      try {
        // Use the same API key and URL as the news page
        const API_KEY = 'f53a68759063421ea95f364052df870f'; 
        const API_URL = `https://newsapi.org/v2/everything?q=sustainability+melbourne&apiKey=${API_KEY}`;
        
        const response = await axios.get(API_URL);
        const articles = response.data.articles.slice(0, 2); 
        setTrendingArticles(articles); 
      } catch (error) {
        console.error("Error fetching trending articles:", error);
      }
    }
    fetchTrendingArticles();
  }, []);

  return (
    <>
      <div className="mainContent">
        <div className="leftButtons">
          <PrimaryBox page="Information" />
          <PrimaryBox page="Community" />
          <div className="trendingHomeItems">
            {trendingArticles.map((article, index) => (
              <div key={index} className="trendingHomeItem">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title || "No Title Available"}
                    className="trendingImage"
                  />
                )}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <h2>{article.title || "No Title Available"}</h2>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="rightButtons">
          <div className="smallButtonsContainer">
            <PrimaryBox page="WordExplorer" />
            <PrimaryBox page="Games" />
          </div>
          <PrimaryBox page="Garden" />
        </div>
      </div>
    </>
  );
}
