import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

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
            const { success, userid, message } = response.data;
           

            if (userid != -1) {
                setResult(message);
                console.log(userid);
                document.cookie = "userid=" + userid;
                console.log("set userid cookie")
                console.log(getCookie("userid"));
                handleClick('home')
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setResult('An error occurred.');
        }
    };

    const signOut = () => {
        document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    if (getCookie("userid")) {
        return <>
        <h1>My Account</h1>
                <div>
                    <form onSubmit={signOut}>
                        <button type="submit">Sign Out</button>
                    </form>
                    
                </div>
        </>
    } else {
        return (
            <>
                <h1>Login</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        <br></br>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <br></br>

                        <button type="submit">Login</button>
                    </form>
                    {result && <div>{result}</div>}
                </div>

                <Button onClick={() => handleClick('signup')}>
            </Button>



            </>


        );
    }


};

export default UsernameCheck;
