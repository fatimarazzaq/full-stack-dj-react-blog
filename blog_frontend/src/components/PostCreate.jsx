import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';


const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  console.log('userId',userId);


  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !content) {
      setError('Title and Content are required');
      return;
    }

    try {
        console.log('userId',userId);
              
      // Send POST request to create the post
      const response = await axiosInstance.post('posts/create/', {
        user_id: userId,
        title,
        content,
      });

      // If successful, navigate to the post list
      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      setError('Error creating post. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <h2>Create a New Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-lg">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Post Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Post Content
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;
