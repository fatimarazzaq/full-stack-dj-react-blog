import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { logout } from '../features/auth/authSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          await axiosInstance.post('auth/logout/', {
            refresh: refresh_token,
          });
        }
        dispatch(logout());
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;