import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import AdminSettings from './AdminSettings'; // Make sure this is the correct import path

const AccountPage = ({ getAdmin }) => {

    //const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [university, setUniversity] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('Change Details')
    const [isEditDisabled, setIsEditDisabled] = useState(true);

    const universities = [
        { value: '(The) University of Melboune', label: '(The) University of Melbourne' },
        { value: '(The) University of Sydney', label: '(The) University of Sydney' },
        { value: 'University of New South Wales', label: 'University of New South Wales' },
        { value: 'RMIT University', label: 'RMIT University' },
        { value: 'Swinburne University', label: 'Swinburne University' },
        { value: 'Deakin University', label: 'Deakin University' },
    ];

    const signOut = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "gardenid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            window.location.reload(); 
        }
    };

    const handleChange = async () => {
        try {
           await axios.post('http://localhost:8000/update-user-details', {
                firstName,
                lastName,
                email,
                university,
            }, { withCredentials: true });

            
        } catch (error) {
            console.error('Error changing details:', error);
        }
    };

    const handleSelectChange = (selectedOption) => {
        setUniversity(selectedOption ? selectedOption.value : '');
    };

    const handleEditButtonClick = () => {
        setIsEditDisabled(!isEditDisabled);
        setMessage(isEditDisabled ? 'Save Details' : 'Edit Details');
        if (!isEditDisabled) {
            handleChange();
        }
    };

    const checkAdmin = () => {
        return getAdmin === 1;
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">My Account</h2>
                    <div className="d-flex justify-content-center mb-4">
                        <img width={60} src="./account.svg" alt="account icon" />
                    </div>
                    <Form onSubmit={signOut}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                disabled={isEditDisabled}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                disabled={isEditDisabled}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                disabled={isEditDisabled}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>University</Form.Label>
                            <Select
                                options={universities}
                                value={universities.find((u) => u.value === university)}
                                onChange={handleSelectChange}
                                isDisabled={isEditDisabled}
                                isSearchable
                            />
                        </Form.Group>

                        <Button variant="secondary" onClick={handleEditButtonClick} className="w-100 mb-3">
                            {message}
                        </Button>
                        <Button variant="primary" type="submit" className="w-100">
                            Sign Out
                        </Button>
                    </Form>
                    
                    <br></br>

                    {/* Conditional Rendering of AdminSettings */}
                    {checkAdmin() && <AdminSettings />}
                </Col>
            </Row>
            <br />
        </Container>
    );
};

export default AccountPage;
