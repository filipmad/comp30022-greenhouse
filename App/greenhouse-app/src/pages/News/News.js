import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./News.css";
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from "../../config";

export default function News() {
    const [title, setTitle] = useState('d');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [dateCreated] = useState('');
    
    const [currentPage, setCurrentPage] = useState(0); // To track current page for "Other News"
    const articlesPerPage = 3; // Number of articles to display per page

    const getRecentBlog = async () => {
        try {
            const response = await axios.get(`${config.deploymentUrl}/get-recent-newspost`, { title, author, text, dateCreated });
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

    const API_KEY = 'f53a68759063421ea95f364052df870f';
    const API_URL = `https://newsapi.org/v2/everything?q=sustainability +melbourne &apiKey=${API_KEY}`;

    const fetchNews = async () => {
        try {
            const response = await axios.get(API_URL);
            setArticles(response.data.articles); // Fetch all articles
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

    // Function to handle left arrow click
    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0)); // Prevent going below 0
    };

    // Function to handle right arrow click
    const handleNext = () => {
        const maxPages = Math.ceil(articles.slice(2).length / articlesPerPage) - 1;
        setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages)); // Prevent going over max pages
    };

    // Get the articles to display based on current page (skip first two for Other News)
    const displayedArticles = articles.slice(2).slice(currentPage * articlesPerPage, (currentPage + 1) * articlesPerPage);

    const navigate = useNavigate();

    // Function to navigate to newsletters
    const handleNavigateToNewsletters = () => {
        navigate('/news/newsletters')
    };

    return (
        <div className="newsContainer">
            <div className="blogSection">
                <Container className="my-4">
                    <h1 className="text-center mb-4">Weekly Blog</h1>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className="p-4 shadow">
                                <Card.Body>
                                    <Card.Title as="h3">{title || "Loading..."}</Card.Title>
                                    <Card.Subtitle className="mb-3 text-muted">{author || "Loading..."}</Card.Subtitle>
                                    <Card.Text>{text || "Loading..."}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <Col md={4}>
                            <Button 
                                variant="primary" 
                                onClick={handleNavigateToNewsletters} 
                                style={{ width: '100%' }}
                            >
                                View All Newsletters
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rightSection">
                {/* Trending Section */}
                <div className="trendingSection">
                    <h1>Trending</h1>
                    <div className="trendingItems">
                        {articles.slice(0, 2).map((article, index) => (
                            <div className="trendingItem" key={index}>
                                {article.urlToImage && (
                                    <img src={article.urlToImage} alt={article.title} className="trendingImage" />
                                )}
                                <h3>{article.title || "No title available"}</h3>
                                <p>By: {article.author || "Unknown Author"}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other News Section with Arrows */}
                <div className="newsSection">
                    <h1>Other News</h1>
                    <div className="newsItemsContainer">
                        <button className="arrowButton leftArrow" onClick={handlePrev} disabled={currentPage === 0}></button>
                        <div className="newsItems">
                            {displayedArticles.map((article, index) => (
                                <div className="newsItem" key={index}>
                                    {article.urlToImage && (
                                        <img src={article.urlToImage} alt={article.title} className="newsImage" />
                                    )}
                                    <h2>{article.title}</h2>
                                    <p>{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                </div>
                            ))}
                        </div>
                        <button className="arrowButton rightArrow" onClick={handleNext} disabled={currentPage === Math.ceil(articles.slice(2).length / articlesPerPage) - 1}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
