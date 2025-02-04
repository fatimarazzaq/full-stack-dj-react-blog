import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const performLogout = async () => {
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        if (refresh_token) {
          await axiosInstance.post('auth/logout/', {
            refresh: refresh_token,
          });
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        logout();
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    performLogout();
  }, [navigate, logout]);

  return (
    <div>Logging out...</div>
  );
};

export default Logout;