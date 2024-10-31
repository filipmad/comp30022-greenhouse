import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function ForumManager() {
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newOptionOneText, setNewOptionOneText] = useState('');
    const [newOptionTwoText, setNewOptionTwoText] = useState('');

    const [polls, setPolls] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [optionOnetext, setOptionOneText] = useState('');
    const [optionTwotext, setOptionTwoText] = useState('');
    const [editPollID, setEditPollID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCreatePoll = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/add-poll', {
                title: newTitle,
                text: newText,
                optionOnetext: newOptionOneText,
                optionTwotext: newOptionTwoText,
            });
            if (response.data.success) {
                console.log("Poll created successfully!");
                getPolls();
                resetForm();
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

    // Handle updating a poll
    const handleUpdatePoll = async () => {
        try {
            await axios.post('http://localhost:8000/update-poll', {
                pollID: editPollID,
                title: title,
                text: text,
                optionOnetext: optionOnetext,
                optionTwotext: optionTwotext,
            });
            console.log("Poll updated successfully!");
            getPolls();
            resetForm();
        } catch (error) {
            console.error('Error updating poll:', error);
        }
    };

    // Handle deleting a poll
    const handleDeletePoll = async (pollId) => {
        try {
            await axios.post('http://localhost:8000/delete-poll', {
                pollID: pollId,
            });
            console.log("Poll deleted successfully!");
            getPolls();
        } catch (error) {
            console.error('Error deleting poll:', error);
        }
    };

    // Set the poll data in state when editing
    const handleEditPoll = (poll) => {
        setEditPollID(poll.pollID);
        setTitle(poll.title);
        setText(poll.text);
        setOptionOneText(poll.optionOneText);
        setOptionTwoText(poll.optionTwoText);
        setShowModal(true);
    };

    // Reset form state
    const resetForm = () => {
        setEditPollID(null);
        setTitle('');
        setText('');
        setOptionOneText('');
        setOptionTwoText('');
        setNewTitle('');
        setNewText('');
        setNewOptionOneText('');
        setNewOptionTwoText('');
        setShowModal(false);
    };

    useEffect(() => {
        getPolls();
    }, []);

    return (
        <div>
            <Container>
                <h2 className="text-center mt-4">Forum Manager</h2>

                <h4 className="mt-5">View Forum</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Text</th>
                            <th>Author</th>
                            <th>Likes</th>
                            <th>Comments Off</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll) => (
                            <tr key={poll.pollID}>
                                <td>{poll.title}</td>
                                <td>{poll.text}</td>
                                <td>Filip Madyarov</td>
                                <td>{poll.optionOneText}</td>
                                <td>{poll.optionTwoText}</td>
                                <td>
                                    <Button disabled variant="warning" onClick={() => handleEditPoll(poll)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button disabled variant="danger" onClick={() => handleDeletePoll(poll.pollID)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h4 className="mt-5">Create New Forum Post</h4>
                <Form onSubmit={handleCreatePoll}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter forum title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter forum text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Enable Likes"
                    /><Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Enable Comments"
                    />
                    <Button disabled variant="primary" type="submit">
                        Create Forum Post
                    </Button>
                </Form>

                {/* Modal for editing a poll */}
                <Modal show={showModal} onHide={resetForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Poll</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Option One</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={optionOnetext}
                                    onChange={(e) => setOptionOneText(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Option Two</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={optionTwotext}
                                    onChange={(e) => setOptionTwoText(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled variant="secondary" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button disabled variant="primary" onClick={handleUpdatePoll}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}
