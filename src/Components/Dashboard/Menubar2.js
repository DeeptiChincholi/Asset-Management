import React, { useState } from 'react'
import Data from './Data.json'
import Menubar from './Menubar';
import { useNavigate } from 'react-router-dom';
const Menubar2 = ({closeMenu}) => {

  const [menuClose,setMenuClose] = useState(false);
   
  const handleClose = () => {
    setMenuClose(true);
    closeMenu(); // Notify parent component to close the menu
  };
const navigate = useNavigate();
  return (


    <div className={`${ menuClose ? 'menubar22' :'menubar2'}`}>
    <div className='menucross'>
   
        
        <i onClick={handleClose} class="fa-solid fa-xmark fa-xl"> </i>
  
    </div>
        
            <ul className='inmenu'>
              {Data.map((e,i) => (
              <li>
              <div className='menu2ico'>
              <button onClick={()=>navigate(`/${e.linkto}`)}>
              <i className={e.icon}></i>
              <span className='ml-2'>{e.name}</span>
              </button>
              </div>
              </li>
            ))}
            </ul>
     
    </div>
  )
}

export default Menubar2