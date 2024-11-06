import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config';

export default function ForumManager() {
    // State variables for creating a new forum post
    const [newTitle, setNewTitle] = useState('');
    const [newText, setNewText] = useState('');
    const [newLikes, setNewLikes] = useState(-1);
    const [newCommentsEnabled, setNewCommentsEnabled] = useState(0); // 0 means disabled

    // State variables for editing an existing forum post
    const [editTitle, setEditTitle] = useState('');
    const [editText, setEditText] = useState('');
    const [editLikes, setEditLikes] = useState(-1);
    const [editCommentsEnabled, setEditCommentsEnabled] = useState(0); // 0 means disabled
    const [editPostID, setEditPostID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [posts, setPosts] = useState([]); // Initialize posts to an empty array

    const handleCreateForumPost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${config.deploymentUrl}/create-forumpost`,
                {
                    title: newTitle,
                    text: newText,
                    likes: newLikes,
                    commentsEnabled: newCommentsEnabled,
                },
                { withCredentials: true } // This enables cookies
            );
            if (response.data.success) {
                console.log("Forum post created successfully!");
                getPosts();
                resetForm();
            }
        } catch (error) {
            console.error('Error creating forum post:', error);
        }
    };

    const handleLikesChange = (e) => {
        setNewLikes(e.target.checked ? 0 : -1);
    };

    const handleCommentsChange = (e) => {
        setNewCommentsEnabled(e.target.checked ? 1 : 0); // 1 for enabled, 0 for disabled
    };

    // Fetch Forum Posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${config.deploymentUrl}/get-forumposts`);
            setPosts(response.data || []); // Set posts to empty array if response.data is null
        } catch (error) {
            console.log('Error loading forum posts:', error);
            setPosts([]); // Ensure posts is set to an empty array on error
        }
    };

    // Handle updating a post
    const handleUpdatePost = async () => {
        try {
            await axios.post(`${config.deploymentUrl}/update-forumposts`, {
                postID: editPostID,
                title: editTitle,
                text: editText,
                likes: editLikes,
                commentsEnabled: editCommentsEnabled,
            });
            console.log("Forum post updated successfully!");
            getPosts();
            resetForm();
        } catch (error) {
            console.error('Error updating forum post:', error);
        }
    };

    // Handle deleting a post
    const handleDeletePost = async (postId) => {
        try {
            await axios.post(`${config.deploymentUrl}/delete-forumpost`, {
                postID: postId,
            });
            console.log("Forum post deleted successfully!");
            getPosts();
        } catch (error) {
            console.error('Error deleting forum post:', error);
        }
    };

    // Set the post data in state when editing
    const handleEditPost = (post) => {
        setEditPostID(post.postID);
        setEditTitle(post.title);
        setEditText(post.text);
        setEditLikes(post.likes);
        setEditCommentsEnabled(post.commentsEnabled); // Already set as 0 or 1
        setShowModal(true);
    };

    // Reset form state
    const resetForm = () => {
        setEditPostID(null);
        setNewTitle('');
        setNewText('');
        setNewLikes(-1); // Reset to default (-1 means likes are disabled)
        setNewCommentsEnabled(0); // Reset comments to disabled (0)
        setEditTitle('');
        setEditText('');
        setEditLikes(-1);
        setEditCommentsEnabled(0); // Reset edit comments to disabled (0)
        setShowModal(false);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            <Container>
                <h2 className="text-center mt-4">Forum Manager</h2>

                <h4 className="mt-5">View Forum</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Text</th>
                            <th>Author</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No forum posts available</td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.postID}>
                                    <td>{post.title}</td>
                                    <td>{post.text}</td>
                                    <td>{post.authorID}</td>
                                    <td>{post.likes === -1 ? 'Disabled' : post.likes}</td>
                                    <td>{post.commentsEnabled === 0 ? 'Disabled' : 'Enabled'}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleEditPost(post)} className="me-2">
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeletePost(post.postID)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <h4 className="mt-5">Create New Forum Post</h4>
                <Form onSubmit={handleCreateForumPost}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter forum title"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter forum text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Check
                        type="switch"
                        id="likes-switch"
                        label="Enable Likes"
                        checked={newLikes === 0}
                        onChange={handleLikesChange}
                    />
                    <Form.Check
                        type="switch"
                        id="comments-switch"
                        label="Enable Comments"
                        checked={newCommentsEnabled === 1} // Enable when newCommentsEnabled is 1
                        onChange={handleCommentsChange}
                    />
                    <Button variant="primary" type="submit">
                        Create Forum Post
                    </Button>
                </Form>

                {/* Modal for editing a post */}
                <Modal show={showModal} onHide={resetForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Forum Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Text</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Check
                                type="switch"
                                id="likes-switch-edit"
                                label="Enable Likes"
                                checked={editLikes === 0}
                                onChange={(e) => setEditLikes(e.target.checked ? 0 : -1)}
                            />
                            <Form.Check
                                type="switch"
                                id="comments-switch-edit"
                                label="Enable Comments"
                                checked={editCommentsEnabled === 1} // Enable when editCommentsEnabled is 1
                                onChange={(e) => setEditCommentsEnabled(e.target.checked ? 1 : 0)}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdatePost}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}
