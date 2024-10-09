// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

// import { useNavigate } from 'react-router-dom';


// function SignUpPage() {

//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate('/login'); // This will take you to the About page
//     };

//     return (
//         <>
//             <h1>Sign Up</h1>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Enter an Email address</Form.Label><br></br>
//                     <Form.Control type="email" placeholder="Enter email" /><br></br>
//                     <Form.Text className="text-muted">
//                         We'll never share your email with anyone else.
//                     </Form.Text>
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label>Password</Form.Label><br></br>
//                     <Form.Control type="password" placeholder="Password" />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                     <Form.Check type="checkbox" label="Check me out" />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" onClick={handleClick}>
//                     Submit
//                 </Button>

//                 <Button>
//                     Sign Up
//                 </Button>
//             </Form>
//         </>
//     );
// }

// export default SignUpPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UploadProfile = () => {

    const navigate = useNavigate();

    const handleClick = (inputValue) => {
        navigate(`/${inputValue}`); // This will take you to the About page
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [result, setResult] = useState('');

    const handleCreateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/create-profile', { username, password, university });
            const { success, message } = response.data;
            setResult(message);
            if (success) {
                handleClick('home')
            }
        } catch (error) {
            console.error('Error creating profile:', error);
            setResult('An error occurred.');
        }


    };



    return (
        <>

            <div>
                <form onSubmit={handleCreateProfile}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />

                    <input
                        type="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="Enter university"
                    />

                    <button type="submit">Login</button>
                </form>
                {result && <div>{result}</div>}
            </div>



        </>


    );
};

export default UploadProfile;