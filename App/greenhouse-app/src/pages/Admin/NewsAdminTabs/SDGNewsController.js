import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import config from '../../../config';



export default function SDGNewsTab() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleCreateNewsPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config}create-newspost`, { title, author, text });
            const { success, message } = response.data;
            if (success) {
                console.log("success!")
            }
        } catch (error) {
            console.error('Error creating post:', error);
            //setDisplayedError('An error occurred.');
        }
    }

    return (
        //<Tab title="Add News Post">
            <Form onSubmit={handleCreateNewsPost}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Newsletter Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicTextField">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </Form.Group>

                <Button variant="success" type="submit">Submit
                </Button>
            </Form>

        //</Tab>
    );
}

