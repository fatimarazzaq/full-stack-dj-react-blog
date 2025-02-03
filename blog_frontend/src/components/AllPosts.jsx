import React, { useEffect, useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../features/post/postSlice';

const AllPosts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchData = async () => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MTk4MDE5LCJpYXQiOjE3Mzg1OTMyMTksImp0aSI6IjU0YzIzNDJiOWZmYTQ5MDk5NGEyMzdkZTI3NGM1NGI1IiwidXNlcl9pZCI6Im1UWkIzTndTMzl2R1V4cHJMR1c4N2oifQ.UedFg6ik8bYbNhQVwI4CSlWn2m7raw3N76WyVm5bxlo"; // Replace with actual JWT token
      
            try {
              const response = await axios.get("http://127.0.0.1:8000/api/posts/", {
                headers: {
                  Authorization: `Bearer ${token}`, // Pass JWT token in headers
                },
              });
      
              setData(response.data);
              dispatch(setPosts(response.data)); // Dispatch action to set posts in Redux
                console.log(response.data);
                              
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
    },[])

    return (
        <div className="container">
            <div className="d-flex justify-between flex-wrap">
                {
                    data.map((obj,key)=>(<div key={key} className="card m-3 my-4" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{obj.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                            <p className="card-text">{obj.content}</p>
                            <NavLink to={`/detail/${obj.post_id}`} className="card-link mt-1 btn btn-primary">See more...</NavLink>
                        </div>
                    </div>))
                }
            </div>
        </div>
  )
}

export default AllPosts