import React from 'react'
import Data from './Data.json'
import Menubar2 from './Menubar2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  
  const navigate = useNavigate();
  return (
   
    <div className='menubar'>
     
          <i className='dashbar fa-solid fa-bars fa-xl' onClick={toggleMenu}></i>
          
          {showMenu && <Menubar2 closeMenu={closeMenu} />}
            
            <ul className='inmenu'>
              {Data.map((e,i) => (
              <li>
              {/* <i onClick={()=>navigate("/{e.linkto}")}className={e.icon}></i> */}
              <i onClick={() => navigate(`/${e.linkto}`)} className={e.icon}></i>
              </li>
            ))}
            </ul>
            
            
     
    </div>
  )
}

export default Menubar