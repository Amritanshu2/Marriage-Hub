import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [caste, setCaste] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!gmail || !password || !caste || !gender) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        gmail,
        password,
        gender,
        caste
      });
      console.log('Signup successful:', response.data);
      alert('Signup successful! Please sign in now.');

      setGmail('');
      setPassword('');
      setCaste('');
      setGender('');

      navigate('/login');

    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      alert('Signup failed: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler}>
        <h2 className="form-title">Signup</h2>

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

        <div className="form-group">
          <label>Caste</label>
          <input
            type="text"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            placeholder="Enter your caste"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter your gender"
            required
          />
        </div>

        <button type="submit" className="form-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
