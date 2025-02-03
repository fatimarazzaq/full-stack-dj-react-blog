import React from 'react'
import Header from './components/Header'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AllPosts from './components/AllPosts'
import PostCreate from './components/PostCreate'
import PostDetail from './components/PostDetail'

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/detail/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  )
}

export default App