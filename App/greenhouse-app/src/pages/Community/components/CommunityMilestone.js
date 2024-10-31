import { Container, Card, ProgressBar, Row, Col } from 'react-bootstrap';

const CommunityMilestone = ({ title, description, progress }) => (
  <Container className="my-4">
    <Card className="p-4 shadow-sm">
      <Row className="align-items-center">
        <Col>
          {/* Title and Description */}
          <Card.Title as="h5">{title || "Loading milestone..."}</Card.Title>
          <Card.Text className="text-muted">{description || "Loading description..."}</Card.Text>
        </Col>
      </Row>

      {/* Progress Bar */}
      <Card.Body>
        <ProgressBar now={progress} label={`${progress}%`} />
      </Card.Body>
    </Card>
  </Container>
);

export default CommunityMilestone;
