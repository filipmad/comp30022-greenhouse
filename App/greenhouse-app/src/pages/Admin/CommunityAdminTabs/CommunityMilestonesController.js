import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

const CommunityMilestoneManager = () => {
    const [milestones, setMilestones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState(null);
    const [activityType, setActivityType] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch milestones on component mount
    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/milestones', { withCredentials: true });
                setMilestones(response.data);
            } catch (error) {
                console.error('Error fetching milestones:', error);
                setError('Failed to load milestones');
            }
        };
        fetchMilestones();
    }, []);

    // Handle creation of new milestone
    const handleCreateMilestone = async () => {
        try {
            const response = await axios.post('http://localhost:8000/milestones', 
                { activityType, targetValue },
                { withCredentials: true }
            );
            if (response.data.success) {
                setMilestones([...milestones, response.data.milestone]);
                setSuccess('Milestone created successfully');
                resetForm();
            } else {
                setError('Failed to create milestone');
            }
        } catch (error) {
            console.error('Error creating milestone:', error);
            setError('Failed to create milestone');
        }
    };

    // Handle editing milestone
    const handleEditMilestone = (milestone) => {
        setEditingMilestone(milestone);
        setActivityType(milestone.activityType);
        setTargetValue(milestone.targetValue);
        setShowModal(true);
    };

    const handleUpdateMilestone = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/milestones/${editingMilestone.id}`, 
                { activityType, targetValue },
                { withCredentials: true }
            );
            if (response.data.success) {
                setMilestones(milestones.map(m => m.id === editingMilestone.id ? response.data.milestone : m));
                setSuccess('Milestone updated successfully');
                resetForm();
            } else {
                setError('Failed to update milestone');
            }
        } catch (error) {
            console.error('Error updating milestone:', error);
            setError('Failed to update milestone');
        }
    };

    // Delete milestone
    const handleDeleteMilestone = async (milestoneId) => {
        try {
            await axios.delete(`http://localhost:8000/milestones/${milestoneId}`, { withCredentials: true });
            setMilestones(milestones.filter(milestone => milestone.id !== milestoneId));
            setSuccess('Milestone deleted successfully');
        } catch (error) {
            console.error('Error deleting milestone:', error);
            setError('Failed to delete milestone');
        }
    };

    // Reset form state
    const resetForm = () => {
        setEditingMilestone(null);
        setActivityType('');
        setTargetValue('');
        setShowModal(false);
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
                        <th>Activity Type</th>
                        <th>Target Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {milestones.map((milestone) => (
                        <tr key={milestone.id}>
                            <td>{milestone.id}</td>
                            <td>{milestone.activityType}</td>
                            <td>{milestone.targetValue}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditMilestone(milestone)} className="me-2">
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteMilestone(milestone.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Create New Milestone</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Activity Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        required
                    >
                        <option value="">Select an Activity Type</option>
                        <option value="play_hours">Play a Game for X Hours</option>
                        <option value="collective_score">Achieve Collective Score in Game</option>
                        <option value="visit_news">Visit News Posts</option>
                        <option value="contribute_polls">Contribute to Polls</option>
                        <option value="score_quiz">Score X% in SDG Quiz</option>
                        <option value="buy_plants">Buy Plants</option>
                        <option value="visit_sdg_pages">Visit SDG Pages</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Target Value</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter target value for milestone"
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" onClick={editingMilestone ? handleUpdateMilestone : handleCreateMilestone}>
                    {editingMilestone ? "Update Milestone" : "Create Milestone"}
                </Button>
            </Form>

            {/* Modal for editing a milestone */}
            <Modal show={showModal} onHide={resetForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Milestone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Activity Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={activityType}
                                onChange={(e) => setActivityType(e.target.value)}
                            >
                                <option value="play_hours">Play a Game for X Hours</option>
                                <option value="collective_score">Achieve Collective Score in Game</option>
                                <option value="visit_news">Visit News Posts</option>
                                <option value="contribute_polls">Contribute to Polls</option>
                                <option value="score_quiz">Score X% in SDG Quiz</option>
                                <option value="buy_plants">Buy Plants</option>
                                <option value="visit_sdg_pages">Visit SDG Pages</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Target Value</Form.Label>
                            <Form.Control
                                type="number"
                                value={targetValue}
                                onChange={(e) => setTargetValue(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetForm}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateMilestone}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CommunityMilestoneManager;
