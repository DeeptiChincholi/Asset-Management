import React, { createContext, useState } from 'react';

export const Context = createContext();
export const ConProvider =({children}) =>{

    const [firstName, setFirstName] = useState('');
    // useEffect(()=>{
    //     console.log(firstName)
    // })
    
    const[countOfAssets, setCountOfAssets] = useState()
    return(
        <Context.Provider value={{firstName,setFirstName, countOfAssets, setCountOfAssets}}>
            {children} 
        </Context.Provider>
    );
}
