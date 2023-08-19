import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Logout = () => {
 const {state,dispatch} = useContext(UserContext)
const navigate=useNavigate();
    const Userlogout=async()=> {
        try{
        const response = await fetch('/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        if(response){
            dispatch({type:"USER",payload:false})
            navigate('/login', { replace: true });
        }
    }
    catch(err){
        console.log(err);
    }


    }
useEffect(() => {



    Userlogout();

}, [])



  return (
    <>
        








    </>
  )
}

export default Logout