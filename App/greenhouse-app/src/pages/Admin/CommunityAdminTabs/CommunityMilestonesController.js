import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';

const CommunityMilestoneManager = () => {
    const [milestones, setMilestones] = useState([]);
    const [text, setText] = useState('');
    const [target, setTarget] = useState('');
    const [visitedSite, setVisitedSite] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchMilestones = async () => {
        try {
            const response = await axios.get(`${config.deploymentUrl}/get-milestones`, { withCredentials: true });
            setMilestones(response.data);
        } catch (error) {
            console.error('Error fetching milestones:', error);
            setError('Failed to load milestones');
        }
    };
    
    // Fetch milestones on component mount
    useEffect(() => {
        fetchMilestones();
    }, []);

    // Handle creation of new milestone
    const handleCreateMilestone = async () => {
        try {
            const newMilestone = { 
                text, 
                target: parseInt(target, 10), 
                visitedSite,
                status: '', // Add default status
                progress: 0, // Initialize progress
            };
            const response = await axios.post(`${config.deploymentUrl}/create-milestone`, newMilestone, { withCredentials: true });
            
            // Ensure response.data is the complete milestone object
            if (response.data) {
                fetchMilestones()
                setSuccess('Milestone created successfully');
                // Clear the form fields
                setText('');
                setTarget('');
                setVisitedSite('');
            } else {
                setError('Failed to create milestone');
            }
        } catch (error) {
            console.error('Error creating milestone:', error);
            setError('Failed to create milestone');
        }
    };

    // Delete milestone
    const handleDeleteMilestone = async (milestoneId) => {
        try {
            await axios.post(`${config.deploymentUrl}/delete-milestone`, {milestoneId}, { withCredentials: true });
            fetchMilestones()
            setSuccess('Milestone deleted successfully');
        } catch (error) {
            console.error('Error deleting milestone:', error);
            setError('Failed to delete milestone');
        }
    };

    return (
        <Container>
            <h2 className="text-center mt-4">Community Milestone Manager</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <h4 className="mt-5">All Milestones</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Target</th>
                        <th>Progress</th>
                        <th>Visited Site</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(milestones) && milestones.length > 0 ? (
                        milestones.map((milestone) => (
                            <tr key={milestone.id}>
                                <td>{milestone.id}</td>
                                <td>{milestone.text}</td> 
                                <td>{milestone.target}</td>
                                <td>{milestone.progress}</td>
                                <td>{milestone.visitedSite}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteMilestone(milestone.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No milestones available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <h4 className="mt-5">Create New Milestone</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter milestone text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Target</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter target value"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Visited Site</Form.Label>
                    <Form.Control
                        as="select"
                        value={visitedSite}
                        onChange={(e) => setVisitedSite(e.target.value)}
                    >
                        <option value="">Select an Activity Type</option>
                        <option value="game">Play a Game</option>
                        <option value="news">Visit News Posts</option>
                        <option value="polls">Contribute to Polls</option>
                        <option value="garden">Buy Plants</option>
                        <option value="sdg">Visit SDG Pages</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleCreateMilestone}>
                    Create Milestone
                </Button>
            </Form>
        </Container>
    );
};

export default CommunityMilestoneManager;
