import { Card, ProgressBar, Button, Row, Col } from 'react-bootstrap';

const Poll = ({ poll, handleVote }) => {
  const totalVotes = poll.optionOneVotes + poll.optionTwoVotes;
  const optionOnePercentage = ((poll.optionOneVotes / totalVotes) * 100).toFixed(1);
  const optionTwoPercentage = ((poll.optionTwoVotes / totalVotes) * 100).toFixed(1);

  return (
    <Card className="my-3 p-4 shadow-sm">
      {/* Poll Title */}
      <Card.Title as="h6">{poll.title || "Loading poll title..."}</Card.Title>
      {/* Poll Description */}
      <Card.Text>{poll.text || "Loading poll description..."}</Card.Text>

      {/* Poll Options with Progress */}
      <ProgressBar className="mb-3">
        <ProgressBar 
          animated 
          variant="success" 
          now={optionOnePercentage} 
          label={`${optionOnePercentage}%`} 
          key={1} 
        />
        <ProgressBar 
          animated 
          variant="danger" 
          now={optionTwoPercentage} 
          label={`${optionTwoPercentage}%`} 
          key={2} 
        />
      </ProgressBar>

      {/* Voting Buttons */}
      <Row className="text-center">
        <Col>
          <Button 
            variant="outline-success" 
            onClick={() => handleVote(poll.pollID, 'one')}
            className="w-100"
          >
            {poll.optionOneText || "Option 1"}
          </Button>
        </Col>
        <Col>
          <Button 
            variant="outline-danger" 
            onClick={() => handleVote(poll.pollID, 'two')}
            className="w-100"
          >
            {poll.optionTwoText || "Option 2"}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Poll;
