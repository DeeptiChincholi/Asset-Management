import React, { useState } from 'react'
import Ril from  './Ril';
import Customer from './Customer';
import Background from './Background';


const Form = () => {

    const [riluser,setriluser] = useState("false");
    const [customer,setcustomer] = useState("false");
    const handleRilUser=()=>{
        setriluser("true");
    }
    if(riluser == "true")
        {
            // setriluser("false");
           return (<Ril/>); 
        }
    const handleCustomerUser=()=>{
        setcustomer("true");
    }
    if(customer=="true")
        {
            // setcustomer("false");
            return (<Customer/>);
        }
  return (

    <>
   <Background/>
    <div className='outerform flex ml-96 mr-10'>
    <div className='text-black mt-10 ml-96 bg-white w-10/12 innform'>
    <div className='text-black text-xl font-bold mt-10 ml-10'> Welcome to</div>
    <div className='font-bold text-4xl text-blue-700 mt-5 ml-10 '>JAWS Cloud Platform</div>
    <div className=' text-blue-600 font-semibold text-lg ml-60 mt-20'>Choose an account type</div>
   
   <div>
    <div>
        <button className=' btnn mt-20 ml-28 w-2/3 h-12 bg-slate-100 ' onClick={handleRilUser}>
            RIL USER
        </button>
   </div>
        <button className='btnn mt-5 ml-28 w-2/3 h-12 bg-slate-100' onClick={handleCustomerUser}>
            Customer
        </button>
        </div>
    </div>
    </div>
    </>
  )
}

export default Form