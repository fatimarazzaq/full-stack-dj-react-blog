import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !content) {
      setError('Title and Content are required');
      return;
    }

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MTk4MDE5LCJpYXQiOjE3Mzg1OTMyMTksImp0aSI6IjU0YzIzNDJiOWZmYTQ5MDk5NGEyMzdkZTI3NGM1NGI1IiwidXNlcl9pZCI6Im1UWkIzTndTMzl2R1V4cHJMR1c4N2oifQ.UedFg6ik8bYbNhQVwI4CSlWn2m7raw3N76WyVm5bxlo"; // Replace with actual JWT token
      const user_id =  "mTZB3NwS39vGUxprLGW87j"
      
      // Send POST request to create the post
      const response = await axios.post('http://127.0.0.1:8000/api/posts/create/', {
        user_id,
        title,
        content,
      },{
        headers: {
          Authorization: `Bearer ${token}`, // Pass JWT token in headers
        },
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
