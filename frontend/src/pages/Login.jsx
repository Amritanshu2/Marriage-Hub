import React, { useState } from 'react';
import axios from 'axios';

const Signin = ({ setIsLoggedIn }) => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!gmail || !password) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/signin', {
        gmail,
        password
      });

      console.log('Signin successful:', response.data);

      localStorage.setItem('token', response.data.token);

      setIsLoggedIn(true);

      alert('Signin successful!');
      window.location.href = '/'; 


      setGmail('');
      setPassword('');

    } catch (error) {
      console.error('Error during signin:', error.response?.data || error.message);
      alert('Signin failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler}>
        <h2 className="form-title">Signin</h2>

        <div className="form-group">
          <label>Mail</label>
          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="form-button">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
