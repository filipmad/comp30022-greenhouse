import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Image, Button, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';
import axios from 'axios';
import config from '../../../config';

const ForumPost = ({ postID, title, datePosted, text, likes, commentsEnabled }) => {
  // State for comments and likes
  const [comments, setComments] = useState([]);
  const [localLikes, setLocalLikes] = useState(likes);
  const [newComment, setNewComment] = useState("");

  // Function to fetch all comments for the post
  const fetchComments = async () => {
    try {
      const response = await axios.post(`${config.deploymentUrl}/get-comments`, { id: postID }, { withCredentials: true });
      // Ensure comments is always an array
      console.log("comments: ", response.data.comments)
      
      setComments(response.data.comments || []); 
    } catch (error) {
      console.log('Error fetching comments', error);
    }
  };

  useEffect(() => {
    // Fetch comments when the component mounts or postID changes
    fetchComments();
  }, [postID]);

  const checkComments = async () => {
    try {
      const response = await axios.post(`${config.deploymentUrl}/check-comments`, { postID: postID }, { withCredentials: true });
      return response.data.hasCommented;
    } catch (error) {
      console.log('Error checking comments', error);
      return false;
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const hasCommented = await checkComments();

      if (!hasCommented) {
        try {
          const commentData = { text: newComment, postID: postID };
          const response = await axios.post(`${config.deploymentUrl}/create-comment`, commentData, { withCredentials: true });

          // Update comments with the new comment
          setComments([...comments, { author: response.data.authorName, text: newComment }]);
          setNewComment(""); // Clear input after adding comment
        } catch (error) {
          console.log('Error adding comment', error);
        }
      } else {
        alert("You can only comment once!");
      }
    }
  };

  const handleLikes = () => {
    setLocalLikes(localLikes + 1); // Increment likes
  };

  return (
    <Container className="my-4">
      <Card className="p-3 shadow-sm">
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src="https://via.placeholder.com/50"
              roundedCircle
              width={50}
              height={50}
              alt="Profile"
            />
          </Col>
          <Col>
            <Card.Title as="h5" className="mb-0">{title || "Loading..."}</Card.Title>
            <Card.Subtitle className="text-muted">{datePosted || "Loading date..."}</Card.Subtitle>
          </Col>
        </Row>
        <Card.Body className="pt-3">
          <Card.Text>{text || "Loading post content..."}</Card.Text>
        </Card.Body>
        {likes !== -1 && (
          <Card.Footer className="d-flex align-items-center justify-content-between p-2">
            <Button variant="outline-primary" size="sm" className="d-flex align-items-center" onClick={handleLikes}>
              <FaThumbsUp className="me-1" /> Like
            </Button>
            <span className="text-muted">{localLikes || 0} Likes</span>
          </Card.Footer>
        )}
        {commentsEnabled === 1 && (
          <Card.Body>
            <h6>Comments</h6>
            <ListGroup variant="flush">
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{comment.author}:</strong> {comment.text}
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-muted">No comments yet. Be the first to comment!</p>
              )}
            </ListGroup>
          </Card.Body>
        )}
        {commentsEnabled === 1 && (
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
        )}
      </Card>
    </Container>
  );
};

export default ForumPost;
