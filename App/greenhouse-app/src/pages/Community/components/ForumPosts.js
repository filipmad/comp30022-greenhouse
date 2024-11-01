import React, { useState } from 'react';
import { Container, Card, Row, Col, Image, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';

const ForumPost = ({ /*profilePic,*/ title, datePosted, text, likes }) => {
  // Example list of comments with local state to manage them
  const [comments, setComments] = useState([
    { author: "Jane Doe", content: "Great post! Really insightful." },
    { author: "John Smith", content: "I completely agree with your points." },
    { author: "Alice Johnson", content: "Thanks for sharing this information!" },
    { author: "Bob Brown", content: "Interesting perspective!" },
  ]);
  
  // State for the new comment input
  const [newComment, setNewComment] = useState("");

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { author: "Current User", content: newComment }]);
      setNewComment("");
    }
  };

  return (
    <Container className="my-4">
      {/* Card wrapper for the post with padding and shadow styling */}
      <Card className="p-3 shadow-sm">
        <Row className="align-items-center">
          {/* Profile Picture */}
          <Col xs="auto">
            <Image 
              src={/*profilePic ||*/ "https://via.placeholder.com/50"} 
              roundedCircle 
              width={50} 
              height={50} 
              alt="Profile" 
            />
          </Col>
          
          {/* Title and Date Section */}
          <Col>
            <Card.Title as="h5" className="mb-0">{title || "Loading..."}</Card.Title>
            <Card.Subtitle className="text-muted">{datePosted || "Loading date..."}</Card.Subtitle>
          </Col>
        </Row>
        
        {/* Post Text Section */}
        <Card.Body className="pt-3">
          <Card.Text>{text || "Loading post content..."}</Card.Text>
        </Card.Body>
        
        {/* Likes Section */}
        <Card.Footer className="d-flex align-items-center justify-content-between p-2">
          <Button variant="outline-primary" size="sm" className="d-flex align-items-center">
            <FaThumbsUp className="me-1" /> Like
          </Button>
          <span className="text-muted">{likes || 0} Likes</span>
        </Card.Footer>
        
        {/* Comments Section */}
        <Card.Body>
          <h6>Comments</h6>
          <ListGroup variant="flush">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListGroup.Item key={index}>
                  <strong>{comment.author}:</strong> {comment.content}
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-muted">No comments yet. Be the first to comment!</p>
            )}
          </ListGroup>
        </Card.Body>

        {/* Add Comment Section */}
        <Card.Footer>
          <InputGroup>
            <Form.Control 
              placeholder="Add a comment..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
            />
            <Button variant="primary" onClick={handleAddComment}>
              Comment
            </Button>
          </InputGroup>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ForumPost;
