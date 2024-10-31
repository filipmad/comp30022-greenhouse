import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { FaThumbsUp } from 'react-icons/fa';



const ForumPost = ({ /*profilePic,*/ title, datePosted, text, likes }) => (
  <Container className="my-4">
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
        
        {/* Title and Date */}
        <Col>
          <Card.Title as="h5" className="mb-0">{title || "Loading..."}</Card.Title>
          <Card.Subtitle className="text-muted">{datePosted || "Loading date..."}</Card.Subtitle>
        </Col>
      </Row>
      
      {/* Post Text */}
      <Card.Body className="pt-3">
        <Card.Text>{text || "Loading post content..."}</Card.Text>
      </Card.Body>
      
      {/* Likes */}
      <Card.Footer className="d-flex align-items-center justify-content-between p-2">
        <Button variant="outline-primary" size="sm" className="d-flex align-items-center">
          <FaThumbsUp className="me-1" /> Like
        </Button>
        <span className="text-muted">{likes || 0} Likes</span>
      </Card.Footer>
    </Card>
  </Container>
);

export default ForumPost;
