import React, { useState } from 'react'
import Home from './pages/Home'; // Ensure this is the correct file path
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'
import { Navigate, Routes, Route } from 'react-router-dom'  // Import Routes and Route
import RefreshHandler from './RefreshHandler';

function App() {
  const[isAuthenticated,setAuthenticated] = useState(false)

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className='App'>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
      <Route path="/" element={<Navigate to="/login" />}  />
      <Route path="home" element={<PrivateRoute element={<Home />}/>}  />
     
      <Route path="login" element={<Login />}  />
      <Route path="signup" element={<Signup />}  />
      </Routes>
    </div>
  )
}

export default App
