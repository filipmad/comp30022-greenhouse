import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './SignUp.css'

export default function SignUp() {

  const navigate = useNavigate();

  const handleClick = (inputValue) => {
    navigate(`/${inputValue}`); // This will take you to the About page
  };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [displayedError, setDisplayedError] = useState('');

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create-profile', { firstName, lastName, email, password, university });
      const { success, message } = response.data;
      setDisplayedError(message);
      if (success) {
        handleClick('account')
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      setDisplayedError('An error occurred.');
    }


  };

  const universities = [
    { value: '(The) University of Melboune', label: '(The) University of Melbourne' },
    { value: '(The) University of Sydney', label: '(The) University of Sydney' },
    { value: 'University of New South Wales', label: 'University of New South Wales' },
    { value: 'RMIT University', label: 'RMIT University' },
    { value: 'Swinburne University', label: 'Swinburne University' },
    { value: 'Deakin University', label: 'Deakin University' },
    // Add more universities as needed
  ];

  const handleSelectChange = (selectedOption) => {
    setUniversity(selectedOption ? selectedOption.value : '');
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Sign Up to Greenhouse</h2>

          <Form onSubmit={handleCreateProfile}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email (.edu)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
                <Form.Label>University</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>University</Form.Label>
              <Select
                options={universities}
                value={universities.find((u) => u.value === university)}
                onChange={handleSelectChange}
                placeholder="Select a university"
                isSearchable
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          {displayedError && <div>{displayedError}</div>}
        </Col>
      </Row>
      
    </Container>

    /* <div>
           <form onSubmit={handleCreateProfile}>
               <h2>First Name</h2>
               <input
                   type="firstName"
                   //value={password}
                   //onChange={(e) => setPassword(e.target.value)}
                   placeholder="First Name"
               />
               <br></br>
               <h2>Last Name</h2>
               <input
                   type="lastName"
                   //value={password}
                   //onChange={(e) => setPassword(e.target.value)}
                   placeholder="Last Name"
               />
               <br></br>
               <h2>Registered University Email</h2>
               <input
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   placeholder="Enter username"
               />
               <br></br>
               <h2>Password</h2>
               <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Enter password"
               />
               <br></br>
               <h2>Affiliated University</h2>
               <input
                   type="university"
                   value={university}
                   onChange={(e) => setUniversity(e.target.value)}
                   placeholder="Enter university"
               />
               <br></br>
               <button type="submit">Sign Up</button>
           </form>
           {result && <div>{result}</div>}
       </div> */




  );
}