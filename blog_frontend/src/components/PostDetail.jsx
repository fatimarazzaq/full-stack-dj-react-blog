import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { useSelector } from 'react-redux';

const PostDetail = () => {
  const { postId } = useParams(); // Get postId from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);


  useEffect(()=>{
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axiosInstance.get(`posts/detail/${postId}/`);
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
