import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import AdminSettings from './AdminSettings';
import { useNavigate } from 'react-router-dom';

const AccountPage = ({ getAdmin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [university, setUniversity] = useState('');
    const [email, setEmail] = useState('');
    const [password] = useState('');


    var deployMent = "https://greenhouse-api-deployment-hyfmdxhse8c3gagh.australiasoutheast-01.azurewebsites.net"

    const navigate = useNavigate();

    // New states for deletion guard
    const [emailDeletionGuard, setEmailDeletionGuard] = useState('');
    const [passwordDeletionGuard, setPasswordDeletionGuard] = useState('');

    const [message, setMessage] = useState('Change Details');
    const [isEditDisabled, setIsEditDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const universities = [
        { value: '(The) University of Melbourne', label: '(The) University of Melbourne' },
        { value: '(The) University of Sydney', label: '(The) University of Sydney' },
        { value: 'University of New South Wales', label: 'University of New South Wales' },
        { value: 'RMIT University', label: 'RMIT University' },
        { value: 'Swinburne University', label: 'Swinburne University' },
        { value: 'Deakin University', label: 'Deakin University' },
    ];

    useEffect(() => {
        // Fetch the current user details on component mount
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(deployMent+'/get-profile-details', { withCredentials: true });
                console.log(deployMent+'/get-data')
                const userData = response.data;
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setUniversity(userData.university);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const signOut = async (e) => {
        e.preventDefault();
        try {
            await axios.post(deployMent+'/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "gardenid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/home')
        }
    };

    const handleChange = async () => {
        try {
            await axios.post(deployMent+'/update-user-details', {
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

    const checkAdmin = () => getAdmin === 1;

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDeleteAccountCheck = async () => {
        try {
            const response = await axios.post(deployMent+'/check-username', {
                email: emailDeletionGuard,
                password: passwordDeletionGuard
            }, { withCredentials: true });
            const { success } = response.data;

            if (success) {
                handleDeleteAccount();
                handleCloseModal();
                setEmailDeletionGuard('');
                setPasswordDeletionGuard('');
            } else {
                console.log("Information is not correct!");
            }
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.post(
                deployMent+'/delete-profile',
                { email: emailDeletionGuard, password: passwordDeletionGuard },
                { withCredentials: true }
            );
            const { success } = response.data;

            if (success) {
                window.location.reload();
            } else {
                console.error('Account deletion failed');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

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
                        <Button variant="secondary" onClick={handleShowModal} className="w-100 mb-3">
                            Delete Account
                        </Button>
                        <Button variant="primary" type="submit" className="w-100">
                            Sign Out
                        </Button>
                    </Form>

                    <br />
                    {checkAdmin() && <AdminSettings />}
                </Col>
            </Row>
            <br />
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your email and password to confirm account deletion:</p>
                    <Form>
                        <Form.Group controlId="emailDeletionGuard">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                value={emailDeletionGuard}
                                onChange={(e) => setEmailDeletionGuard(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="passwordDeletionGuard" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={passwordDeletionGuard}
                                onChange={(e) => setPasswordDeletionGuard(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccountCheck}>
                        Confirm Deletion
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AccountPage;
