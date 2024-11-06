import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';

const NewsletterManagement = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newsletterID, setNewsLetterID] = useState(null);


    const [editingNewsletter, setEditingNewsletter] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchNewsletters = async () => {
        try {
            const response = await axios.get(`${config.deploymentUrl}/get-all-newsletters`, { withCredentials: true });
            if (Array.isArray(response.data)) {
                setNewsletters(response.data);
            } else {
                console.error("Invalid data format:", response.data);
                setError("Failed to load newsletters");
            }
        } catch (error) {
            console.error('Error fetching newsletters:', error);
            setError('Failed to load newsletters');
        }
    };

    // Fetch all newsletters on component mount
    useEffect(() => {
       
        fetchNewsletters();
    }, []);
    

    // Function to handle new newsletter creation
    const handleCreateNewsletter = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.deploymentUrl}/create-newsletter`, 
                { title: newTitle, text: newText },
                { withCredentials: true }
            );
            if (response.data.success) {
                fetchNewsletters();
                setSuccess('Newsletter created successfully');
                setNewTitle('');
                setNewText('');
            } else {
                setError('Failed to create newsletter');
            }
        } catch (error) {
            console.error('Error creating newsletter:', error);
            setError('Failed to create newsletter');
        }
    };

    // Function to delete a newsletter
    const handleDeleteNewsletter = async (newsletterId) => {
        try {
            await axios.post(`${config.deploymentUrl}/delete-newsletter`, {newsletterID: newsletterId}, { withCredentials: true });
            setNewsletters(newsletters.filter((newsletter) => newsletter.id !== newsletterId));
            setSuccess('Newsletter deleted successfully');
        } catch (error) {
            console.error('Error deleting newsletter:', error);
            setError('Failed to delete newsletter');
        }
    };

    // Function to open modal for editing
    const handleEditNewsletter = (newsletter) => {
        setEditingNewsletter(newsletter);
        setNewsLetterID(newsletter.id)
        setNewTitle(newsletter.title);
        setNewText(newsletter.text);
        setShowModal(true);
    };

    // Function to handle updating an existing newsletter
    const handleUpdateNewsletter = async () => {
        try {
            const response = await axios.post(`${config.deploymentUrl}/update-newsletter`, 
                { id: newsletterID, title: newTitle, text: newText },
                { withCredentials: true }
            );
            // if (response.data.success) {
                fetchNewsletters();
                setSuccess('Newsletter updated successfully');
                setEditingNewsletter(null);
                setShowModal(false);
                setNewTitle('');
            // } else {
            //     setError('Failed to update newsletter');
            // }
        } catch (error) {
            console.error('Error updating newsletter:', error);
            setError('Failed to update newsletter');
        }
    };

    return (
        <Container>
            <h2 className="text-center mt-4">Newsletter Management</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <h4 className="mt-5">All Newsletters</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {newsletters.map((newsletter) => (
                        <tr key={newsletter.id}>
                            <td>{newsletter.id}</td>
                            <td>{newsletter.title}</td>
                            <td>{newsletter.author}</td>
                            <td>{newsletter.text}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditNewsletter(newsletter)} className="me-2">
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteNewsletter(newsletter.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Create New Newsletter</h4>
            <Form onSubmit={handleCreateNewsletter}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter newsletter title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Enter newsletter content"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Newsletter
                </Button>
            </Form>

            {/* Modal for editing a newsletter */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Newsletter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateNewsletter}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default NewsletterManagement;
