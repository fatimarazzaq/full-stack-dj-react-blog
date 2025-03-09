import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPosts } from '../features/post/postSlice';
import axiosInstance from '../utils/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import './AllPosts.css'; // Import the CSS file

const AllPosts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('posts/');
                setData(response.data);
                dispatch(setPosts(response.data)); // Dispatch action to set posts in Redux
                console.log(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [dispatch, isAuthenticated]);

    return (
        <div className="container">
            <div className="d-flex justify-between flex-wrap">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!isAuthenticated && (
                    <div className="centered-message">
                        <h2>No posts to show</h2>
                    </div>
                )}
                {isAuthenticated && data.length === 0 && (
                    <div className="centered-message">
                        <h2>No posts available</h2>
                    </div>
                )}
                {isAuthenticated && data.map((obj, key) => (
                    <div key={key} className="card m-3 my-4" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{obj.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                            <p className="card-text">{obj.content}</p>
                            <NavLink to={`/detail/${obj.post_id}`} className="card-link mt-1 btn btn-primary">
                                See more...
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPosts;