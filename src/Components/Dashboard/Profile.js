import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Background from '../Login/Background'
import { Link, useNavigate } from 'react-router-dom';
import ChangePass from './ChangePass'
import Navbar from './Header'

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile");
        setProfile(response.data);
        console.log(response.data); // Ensure data is logged correctly
      } catch (error) {
        console.error("Error fetching the profile details", error);
      }
    };

    fetchData();
  }, []);

  // Assuming profile data structure: { firstName, lastName, email }
  // Retrieve string and parse back to object
  const storedUserData = localStorage.getItem('profileData');
  const parsedUserData = JSON.parse(storedUserData);

  console.log(parsedUserData.email); // 'example@example.com'
  console.log(parsedUserData.firstName); // 'John'
  console.log(parsedUserData.lastName); // 'Doe'
  const navigate = useNavigate();
  const [changePass,setChangePass] = useState(false);

  const handleChange=()=>{
       setChangePass(true);
  }
  if(changePass===true)
    return <ChangePass/>

  return (
    <>
    <Background/>
    <Navbar />
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
        width: '40%', // Set the width of the box
        height:'80%',
        background: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        borderRadius: '10px', // Rounded corners
        padding: '20px', // Padding inside the box
        backdropFilter: 'blur(10px)', // Apply backdrop filter for a frosted glass effect
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for depth
        zIndex: 1000, // Ensure profile is above other content
      }}
    >
      <Avatar sx={{ width: 100, height: 100, mb:2, backgroundColor: 'orange' }}>
        {parsedUserData.firstName && <Typography sx={{ fontSize: 36 }}>{parsedUserData.firstName[0]}</Typography>}
      </Avatar>
      <Typography variant="h4" gutterBottom>
        {`${parsedUserData.firstName} ${parsedUserData.lastName}`}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {parsedUserData.email}
      </Typography>

<div sx={{mt:'2'}}>
<button onClick={handleChange}>
        Change Password
      </button>
</div>
      
    </Box>
    </>
  );
};

export default Profile;
