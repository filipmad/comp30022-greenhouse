import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1 className="text-center mb-4">Admin Settings</h1>
            <Button  onClick={() => navigate('/admin-manager')} className="w-100 mb-3">
                Manage Editor Accounts
            </Button>
            <Button  onClick={() => navigate('/community-admin')} className="w-100 mb-3">
                Manage Community Module
            </Button>
            <Button  onClick={() => navigate('/news-admin')} className="w-100 mb-3">
                Manage News Module
            </Button>
        </>
    );
}

export default AdminSettings;
