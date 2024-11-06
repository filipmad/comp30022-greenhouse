import React from 'react';

import NewsletterManagement from './NewsAdminTabs/NewsletterManager';


export default function NewsAdmin() {
    return (
        // Add, Update and Delete News Posts
        <>
        
        <h1 className="mt-5">News Page Admin</h1>
        

            {NewsletterManagement()}

        
        </>
        
    );
}