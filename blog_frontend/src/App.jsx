import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AllPosts from './components/AllPosts';
import PostCreate from './components/PostCreate';
import PostDetail from './components/PostDetail';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/create" element={<PostCreate />} />
          <Route path="/detail/:postId" element={<PostDetail />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;