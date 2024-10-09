// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

// import { useNavigate } from 'react-router-dom';


// interface User {

// }

// function LoginPage() {

// const navigate = useNavigate();

// const handleClick = (inputValue) => {
//     navigate(`/${inputValue}`); // This will take you to the About page
// };

//     return (
//         <>
//             <Form>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Email address</Form.Label><br></br>
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

//                 <Button variant="primary" type="submit" onClick={() => handleClick('home')}>
//                     Submit
//                 </Button>

//                 <Button onClick={() => handleClick('signup')}>
//                     Sign Up
//                 </Button>
//             </Form>
//         </>
//     );
// }

// export default LoginPage;
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UsernameCheck = () => {

    const navigate = useNavigate();

    const handleClick = (inputValue) => {
        navigate(`/${inputValue}`); // This will take you to the About page
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/check-username', { username, password });
            const { success, message } = response.data;
            setResult(message);
            if (success) {
                handleClick('home')
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setResult('An error occurred.');
        }


    };



    return (
        <>

            <div>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>
                {result && <div>{result}</div>}
            </div>

            <Button onClick={() => handleClick('signup')}>
            </Button>

        </>


    );
};

export default UsernameCheck;
