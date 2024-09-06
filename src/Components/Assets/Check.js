import React from 'react'
import Box from '@mui/material/Box';
function Check() {
  const currentData = JSON.parse(localStorage.getItem('currentData'));
  const capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
      
  return (
    <>
    <h1 style={{marginTop:'20px',fontSize:'20px',fontWeight:'bold'}}>Below are the details you submitted!</h1>
   
    <div style={{width:'100vh',padding:'10px' ,background:'#c8decb',marginTop:'20px',marginBottom:'30px' }}>
      {currentData ? (
        Object.entries(currentData).map(([key, value]) => (
          <div key={key}>
            <strong>{capitalize(key)} : </strong>
            <span>{value}</span>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
    </>
  );
};


export default Check
