import React, { useEffect, useState } from 'react';
import { Form, Button, Tabs } from 'react-bootstrap';
import axios from 'axios';
import PollManager from './CommunityAdminTabs/PollAdminController';
 


export default function CommunityAdmin() {

    return (
        // Add, Update and Delete News Posts
        <>
        
        <h1>Community Page Admin</h1>
        
        
            {PollManager()}

        
        
        </>
        
    );



    // Add, Update, and Delete Polls
    


    // Add, Update, and Delete Top Posts



    // Add, Update, and Delete Personal Milestones


    
    // Add, Update, and Delete Community Milestones
}