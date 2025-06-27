import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const PersonalPage = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    gmail: '',
    height: '',
    body_colour: '',
    age: '',
    occupation: '',
    salary: '',
    caste: ''
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prev) => ({ ...prev, gmail: decoded.gmail }));

        axios.get(`http://localhost:5000/person/personal/${decoded.gmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(response => {
            setUser(response.data);
            setLoading(false);
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setShowForm(true);
              setLoading(false);
            } else {
              console.error('Error fetching profile:', error);
              setLoading(false);
              alert('Error fetching profile. Please try again later.');
            }
          });
      } catch (error) {
        console.error('Token decode error:', error);
        setLoading(false);
        alert('Invalid token. Please login again.');
      }
    } else {
      alert('No token found. Please login.');
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData);

    axios.post('http://localhost:5000/person/', formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Failed to save data. Please try again.');
      });
  };

  if (loading) {
    return <h2 style={styles.loading}>Loading...</h2>;
  }

  if (showForm) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Add Your Personal Information</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <FormField label="Gmail" name="gmail" value={formData.gmail} disabled />
            <FormField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            <FormField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
            <FormField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
            <FormField label="Body Colour" name="body_colour" value={formData.body_colour} onChange={handleChange} />
            <FormField label="Age" name="age" value={formData.age} onChange={handleChange} />
            <FormField label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
            <FormField label="Salary" name="salary" value={formData.salary} onChange={handleChange} />
            <FormField label="Caste" name="caste" value={formData.caste} onChange={handleChange} />
            <button type="submit" style={styles.button}>Save</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Personal Information</h1>
        <div style={styles.info}>
          <InfoItem label="Full Name" value={user.fullName} />
          <InfoItem label="Gender" value={user.gender} />
          <InfoItem label="Gmail" value={user.gmail} />
          <InfoItem label="Height" value={`${user.height} cm`} />
          <InfoItem label="Body Colour" value={user.body_colour} />
          <InfoItem label="Age" value={`${user.age} years`} />
          <InfoItem label="Occupation" value={user.occupation} />
          <InfoItem label="Salary" value={`₹${user.salary}`} />
          <InfoItem label="Caste" value={user.caste} />
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, disabled }) => (
  <div style={styles.formField}>
    <label style={styles.label}>{label}:</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={!disabled}
      style={styles.input}
    />
  </div>
);

const InfoItem = ({ label, value }) => (
  <p style={styles.infoItem}>
    <span style={styles.label}>{label}:</span> {value}
  </p>
);

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0e6e6',
    padding: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
    fontSize: '28px',
  },
  info: {
    lineHeight: '2',
    fontSize: '18px',
  },
  infoItem: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginRight: '8px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20%',
    color: '#777',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formField: {
    marginBottom: '15px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ff8080',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default PersonalPage;
