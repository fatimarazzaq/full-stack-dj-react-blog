import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Bloger</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create">Post Create</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">Sign up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;