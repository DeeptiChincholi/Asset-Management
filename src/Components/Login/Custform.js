import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { Context } from '../../Context';
import { useContext } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        JAWS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInOne() {
  const { setFirstName } = useContext(Context);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const custFormData = {
      email: data.get('email'),
      password : data.get('password')
    }

    
    try {
      const response = await axios.post('http://localhost:5000/', custFormData);
      
      if (response.status === 200) {
        // Navigate to dashboard or perform successful login actions
        navigate("/dashboard");
        // console.log(response.data)
        setFirstName(response.data);
        // console.log(firstName)
        localStorage.setItem('firstName', response.data);
        const profileResponse = await axios.get(`http://localhost:5000/profile?email=${custFormData.email}`);
      if (profileResponse.status === 200) {
        localStorage.setItem('profileData', JSON.stringify(profileResponse.data));
        //navigate("/profile"); // Redirect to profile page
      } else {
        console.error("Profile response error:", profileResponse);
      }
        
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 300) {
          setEmailErr(true);
          setPasswordErr(false);
        } else if (err.response.status === 400) {
          setPasswordErr(true);
          setEmailErr(false);
        }
        
      } else {
        console.log(err);
      }
    }
    
  };

  const navigate = useNavigate();
  const [EmailErr,setEmailErr]= useState(false);
  const [PasswordErr,setPasswordErr]= useState(false);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
        height={0}
          item
          xs={false}
          sm={2}
          md={6.35}
          sx={{
            backgroundImage:
              'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid sx={{mx:-5 }}item mt={5} xs={12} sm={8} md={5.65} component={Paper} elevation={6} square>
          <Box 
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className='custg' component="h1" variant="h5">
              Sign in
              <p className='custf'>Sign in using the same email address you use for GCC or your organization email</p>
            </Typography>
            {EmailErr && (
              <Typography style={{ color: 'red' }} className='custg' component="p" variant="body2">
                Invalid Email Id
              </Typography>
            )}
            {PasswordErr && (
              <Typography style={{ color: 'red' }} className='custg' component="p" variant="body2">
                Invalid Password
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoFocus
                type="email"
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
               <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}