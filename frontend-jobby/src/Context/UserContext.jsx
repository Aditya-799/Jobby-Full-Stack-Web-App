import {createContext,useState} from 'react'
export const UserContext=createContext(null)

export function UserProvider(props){
    const [userData,setUserData]=useState(localStorage.getItem('userData') ||{})
    const [isProfileComplete,setIsProfileComplete]=useState(JSON.parse(localStorage.getItem('isProfileComplete')) ||false)
    return (
        <UserContext.Provider value={{userData,isProfileComplete,setUserData,setIsProfileComplete}}>
            {props.children}
        </UserContext.Provider>
    )
}