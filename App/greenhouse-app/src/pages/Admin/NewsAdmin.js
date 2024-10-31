import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddNewsPostTab from './NewsAdminTabs/NewsPostController';
import NewsletterManagement from './NewsAdminTabs/NewsletterManager';


export default function NewsAdmin() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleCreateNewsPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/create-newspost', { title, author, text });
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
        // Add, Update and Delete News Posts
        <>
        
        <h1 className="mt-5">News Page Admin</h1>
        
        {/* <Tabs> */}
            {/*{AddNewsPostTab()}*/}
            {NewsletterManagement()}
        {/* </Tabs> */}
        
        </>
        
    );
}