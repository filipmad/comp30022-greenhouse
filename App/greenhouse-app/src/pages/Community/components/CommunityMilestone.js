import { Container, Card, ProgressBar, Row, Col } from 'react-bootstrap';

const CommunityMilestone = ({ title, text, progress, target }) => {
  // Using target for total status instead of progress
  const totalStatus = target || 100; // Fallback to a default value if target is not provided
  
  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <Row className="align-items-center">
          <Col>
            {/* Title and Description */}
            <Card.Title as="h5">{title || "Loading milestone..."}</Card.Title>
            <Card.Text className="text-muted">{text || "Loading description..."}</Card.Text>
          </Col>
        </Row>

        {/* Progress Bar */}
        <Card.Body>
          <ProgressBar
            now={(progress / totalStatus) * 100} // Calculate the percentage for the progress bar
            label={`${((progress / totalStatus) * 100).toFixed(2)}%`} // Format as a percentage with two decimal places
            max={100} 
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CommunityMilestone;
