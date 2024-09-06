import React from 'react'
import Header from './Header'
import Cards from './Cards'

import BasicTable from './List'
import Menubar from './Menubar'
import Pie from './Pie'



const Dash = () => {
  return (
    <>
    <Menubar/>
   
    <div className='ml-12'>
    
        <Header />
        <div className='flex'>  <Cards/>
        <Pie/></div>
       
        <div className='mt-5 ml-12 text-xl font-bold'>Recent Activities</div>
        <BasicTable/>
    </div>
    </>
  )
}

export default Dash