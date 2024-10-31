import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Table } from 'react-bootstrap';
import axios from 'axios';

const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch all admin accounts on component mount
    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:8000/admins', { withCredentials: true });
                setAdmins(response.data);
            } catch (error) {
                console.error('Error fetching admins:', error);
                setError('Failed to load admins');
            }
        };
        fetchAdmins();
    }, []);

    // Function to handle new admin creation
    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/admins', 
                { email: newAdminEmail, password: newAdminPassword },
                { withCredentials: true }
            );
            if (response.data.success) {
                setAdmins([...admins, response.data.admin]);
                setSuccess('Admin created successfully');
                setNewAdminEmail('');
                setNewAdminPassword('');
            } else {
                setError('Failed to create admin');
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            setError('Failed to create admin');
        }
    };

    // Function to delete an admin
    const handleDeleteAdmin = async (adminId) => {
        try {
            await axios.delete(`http://localhost:8000/admins/${adminId}`, { withCredentials: true });
            setAdmins(admins.filter((admin) => admin.id !== adminId));
            setSuccess('Admin deleted successfully');
        } catch (error) {
            console.error('Error deleting admin:', error);
            setError('Failed to delete admin');
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.email}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteAdmin(admin.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h4 className="mt-5">Create New Admin</h4>
            <Form onSubmit={handleCreateAdmin}>
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
