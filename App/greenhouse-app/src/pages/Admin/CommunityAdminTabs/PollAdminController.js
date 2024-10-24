import React, { useState, useEffect } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

export default function PollManager() {

    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newOptionOnetext, setNewOptionOneText] = useState('');
    const [newOptionTwotext, setNewOptionTwoText] = useState('');

    const [polls, setPolls] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [optionOnetext, setOptionOneText] = useState('');
    const [optionTwotext, setOptionTwoText] = useState('');
    const [editPollID, setEditPollID] = useState(null); // Track poll being edited

    const handleCreatePoll = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/add-poll', {
                title,
                text,
                optionOnetext,
                optionTwotext,
            });
            if (response.data.success) {
                console.log("Poll created successfully!");
                getPolls(); // Refresh poll list after creation
            }
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    // Fetch polls
    const getPolls = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-polls');
            setPolls(response.data);
        } catch (error) {
            console.log('Error loading polls:', error);
        }
    };

    // Handle editing a poll
    const handleEditPoll = async (pollId, title, text, optionOne, optionTwo) => {
        // Update poll logic here
        try {
            await axios.post('http://localhost:8000/update-poll', {
                pollID: pollId,
                title: title,
                text: text,
                optionOnetext: optionOne,
                optionOnetext: optionTwo,
            }         
        );
        } catch (error) {
            console.error('Error updating vote:', error);
        }
         // Update Local Storage
        console.log("Updating poll...");
        getPolls();
    };

    // Handle deleting a poll
    const handleDeletePoll = async (pollId) => {
        try {
            await axios.post('http://localhost:8000/delete-poll', {
                pollID: pollId,
            }    
        );
        } catch (error) {
            console.error('Error updating vote:', error);
        }
        // Update Local Storage
        console.log("Deleting poll with ID:", pollId);
        getPolls();
    };

    // Set the poll data in state when editing
    const handleEditClick = (poll) => {
        setEditPollID(poll.pollID);
        setNewTitle(poll.title);
        setNewText(poll.text);
        setNewOptionOneText(poll.optionOneText);
        setNewOptionTwoText(poll.optionTwoText);
    };

    useEffect(() => {
        getPolls(); // Fetch polls when component mounts
    }, []);

    return (
        <div>
            <h2>Add Poll</h2>
            <Form onSubmit={handleCreatePoll}>
                <Form.Group controlId="formPollTitle">
                    <Form.Label>Poll Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPollText">
                    <Form.Label>Poll Text</Form.Label>
                    <Form.Control
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formOptionOneText">
                    <Form.Label>Option 1 Text</Form.Label>
                    <Form.Control
                        value={optionOnetext}
                        onChange={(e) => setOptionOneText(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formOptionTwoText">
                    <Form.Label>Option 2 Text</Form.Label>
                    <Form.Control
                        value={optionTwotext}
                        onChange={(e) => setOptionTwoText(e.target.value)}
                    />
                </Form.Group>

                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>

            <h2>Polls</h2>
            {polls.length === 0 ? (
                <p>No polls uploaded</p>
            ) : (
                polls.map((poll) => (
                    <div className="poll-item" key={poll.pollID}>
                        {editPollID === poll.pollID ? (
                            <Form onSubmit={() => handleEditPoll(poll.pollID)}>
                                <Form.Group controlId="formEditPollTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEditPollText">
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control
                                        value={newText}
                                        onChange={(e) => setNewText(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEditOptionOneText">
                                    <Form.Label>Option 1</Form.Label>
                                    <Form.Control
                                        value={newOptionOnetext}
                                        onChange={(e) => setNewOptionOneText(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEditOptionTwoText">
                                    <Form.Label>Option 2</Form.Label>
                                    <Form.Control
                                        value={newOptionTwotext}
                                        onChange={(e) => setNewOptionTwoText(e.target.value)}
                                    />
                                </Form.Group>

                                <Button type="submit">Save</Button>
                                <Button onClick={() => setEditPollID(null)}>
                                    Cancel
                                </Button>
                            </Form>
                        ) : (
                            <div>
                                <h5>{poll.title}</h5>
                                <p>{poll.text}</p>
                                <ProgressBar>
                                    <ProgressBar
                                        now={
                                            (poll.optionOneVotes / (poll.optionOneVotes + poll.optionTwoVotes)) *
                                            100
                                        }
                                        label={poll.optionOnetext}
                                        variant="success"
                                    />
                                    <ProgressBar
                                        now={
                                            (poll.optionTwoVotes / (poll.optionOneVotes + poll.optionTwoVotes)) *
                                            100
                                        }
                                        label={poll.optionTwotext}
                                        variant="danger"
                                    />
                                </ProgressBar>

                                <Button onClick={() => handleEditClick(poll)}>
                                    Edit
                                </Button>
                                <Button onClick={() => handleDeletePoll(poll.pollID)}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
