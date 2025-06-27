import './App.css';
import Login from './pages/Login';
import HomePage from './pages/Home';
import Signup from './pages/Signup';
import Personal from './pages/Personal';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <div className='navbar'>
          <img src='/image.png' alt="Logo" className='logo' />
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/personal">Personal</Link></li>
                  <li><a href="#" onClick={logoutHandler}>Logout</a></li>
                </>
              ) : (
                <>
                  <li><a href="/login">Login</a></li>
                  <li><a href="/signup">Signup</a></li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
