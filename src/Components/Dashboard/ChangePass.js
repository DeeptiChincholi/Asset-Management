import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Background from '../Login/Background';
import { TextField, Button } from '@mui/material';
import Profile from './Profile';
import axios from 'axios';
import Navbar from './Header'

const ChangePass = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Please enter both new and confirm passwords');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New and confirm passwords do not match');
      return;
    }

    // Reset error message
    setError('');

    try {
      const storedUserData = localStorage.getItem('profileData');
      const parsedUserData = JSON.parse(storedUserData);
      const email = parsedUserData.email;

      const response = await axios.post("http://localhost:5000/profile", { email, newPassword });

      // Password updated successfully
      console.log(response.data.message); // Log success message

      // Optionally, navigate to profile page or show success message
      setProfile(true);

      // Reset fields after submit if needed
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle Axios errors
      setError('Failed to update password. Please try again.'); // Display error message
    }
  };

  if (profile) {
    return <Profile />;
  }

  return (
    <>
      <Background />
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 15,
          position: 'fixed',
          top: '40%',
          left: '70%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '80%',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          padding: '20px',
          paddingTop: '50px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        <div>Change Password</div>
        <TextField
          name="newPassword"
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={handleChange}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ChangePass;
