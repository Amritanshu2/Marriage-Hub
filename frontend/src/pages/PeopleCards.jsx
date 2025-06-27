import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PeopleCards = () => {
  const token = localStorage.getItem('token');
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/person', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setPeople(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to load profiles. Please try again later.');
          setLoading(false);
        });
    } else {
      setError('No token found. Please log in.');
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <h2 style={styles.loading}>Loading profiles...</h2>;
  }

  if (error) {
    return <h2 style={styles.error}>{error}</h2>;
  }

  if (people.length === 0) {
    return <h2 style={styles.loading}>No profiles found.</h2>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.cardContainer}>
        {people.map((person, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{person.fullName}</h3>
            <p><strong>Gender:</strong> {person.gender}</p>
            <p><strong>Height:</strong> {person.height} cm</p>
            <p><strong>Body Colour:</strong> {person.body_colour}</p>
            <p><strong>Age:</strong> {person.age} years</p>
            <p><strong>Occupation:</strong> {person.occupation}</p>
            <p><strong>Salary:</strong> ₹{person.salary}</p>
            <p><strong>Caste:</strong> {person.caste}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: '30px',
    minHeight: '100vh',
    backgroundColor: '#ffe6e6', // Your main theme background
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#e6f0ff', // Soft blue card
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '280px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#3366cc',
    borderBottom: '2px solid #6699ff',
    paddingBottom: '5px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20%',
    color: '#777',
  },
  error: {
    textAlign: 'center',
    marginTop: '20%',
    color: 'red',
  }
};

export default PeopleCards;
