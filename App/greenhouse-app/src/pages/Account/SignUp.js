import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

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
                handleClick('account')
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
}