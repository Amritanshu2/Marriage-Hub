import React from 'react';
import { jwtDecode } from 'jwt-decode';
import PeopleCards from './PeopleCards';

const Home = () => {
  const token = localStorage.getItem('token');
  let user = {};

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user = decoded;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return (
    <>
        <div className='home-heading'>
            {token ? (
                <>
                  <h2>Hello! Welcome to Home page</h2>
                  <h3>Here are the profiles of people you might be interested in:</h3>
                  <PeopleCards/>
                
                </>
            ) : (
                <h2>Welcome to the Matrimonial Website. Please login or signup.</h2>
                

            )}
        </div>
    </>
  );
};

export default Home;
