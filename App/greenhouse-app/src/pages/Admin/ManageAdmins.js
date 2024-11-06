import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdminFirstName, setAdminFirstName] = useState('')
    const [newAdminLastName, setAdminLastName] = useState('')
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminUniversity, setNewAdminUniversity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const universities = [
        { value: '(The) University of Melboune', label: '(The) University of Melbourne' },
        { value: '(The) University of Sydney', label: '(The) University of Sydney' },
        { value: 'University of New South Wales', label: 'University of New South Wales' },
        { value: 'RMIT University', label: 'RMIT University' },
        { value: 'Swinburne University', label: 'Swinburne University' },
        { value: 'Deakin University', label: 'Deakin University' },
        // Add more universities as needed
    ];

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-admin-profiles', { withCredentials: true });
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
            setError('Failed to load admins');
        }
    };

    //Fetch all admin accounts on component mount
    useEffect(() => {

        fetchAdmins();
    }, []);

    // Function to handle new admin creation
    const handleCreateAdminProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/create-profile', {
                firstName: newAdminFirstName,
                lastName: newAdminLastName,
                email: newAdminEmail,
                password: newAdminPassword,
                university: newAdminUniversity,
                isAdmin: 1
            }, { withCredentials: true });

            const { success, message } = response.data;
            if (success) {
                setSuccess("Admin profile created successfully");
                setNewAdminEmail('');
                setAdminFirstName('');
                setAdminLastName('');
                setNewAdminUniversity('');
                setNewAdminPassword('');
                fetchAdmins();
            } else {
                setError(message || "Failed to create admin profile");
            }
        } catch (error) {
            console.error('Error creating profile:', error);
            setError('An error occurred.');
        }
    };


    return (
        <Container>
            <h2 className="text-center mt-4">Admin Management</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <h4 className="mt-5">All Admins</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Associated University</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.userID}>
                            <td>{admin.userID}</td>
                            <td>{admin.email}</td>
                            <td>{admin.university}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Create New Admin</h4>
            <Form onSubmit={handleCreateAdminProfile}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter admin email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        placeholder="Enter first name"
                        value={newAdminFirstName}
                        onChange={(e) => setAdminFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        placeholder="Enter last name"
                        value={newAdminLastName}
                        onChange={(e) => setAdminLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Associated University</Form.Label>
                    <Form.Control
                        placeholder="Enter admin email"
                        value={newAdminUniversity}
                        onChange={(e) => setNewAdminUniversity(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Admin
                </Button>
            </Form>
        </Container>
    );
};

export default AdminManagement;
