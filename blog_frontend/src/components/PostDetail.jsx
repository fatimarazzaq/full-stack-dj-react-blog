import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { postId } = useParams(); // Get postId from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MTk4MDE5LCJpYXQiOjE3Mzg1OTMyMTksImp0aSI6IjU0YzIzNDJiOWZmYTQ5MDk5NGEyMzdkZTI3NGM1NGI1IiwidXNlcl9pZCI6Im1UWkIzTndTMzl2R1V4cHJMR1c4N2oifQ.UedFg6ik8bYbNhQVwI4CSlWn2m7raw3N76WyVm5bxlo"; // Replace with actual JWT token
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/detail/${postId}/`,{
          headers: {
            Authorization: `Bearer ${token}`, // Pass JWT token in headers
          },
        });
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post details:", err);
      }
    };

    fetchPostDetail();
  }, [postId]);

  // If the post is not found, show a message or navigate away
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header">
          <h2 className="card-title">{post.title}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">{post.content}</p>
        </div>
        <div className="card-footer text-muted">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
