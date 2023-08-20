<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './Styles/Logout.css';
import { RotatingSquare as Loader } from 'react-loader-spinner';

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const [Loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const Userlogout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (response) {
                dispatch({ type: "USER", payload: false })
                navigate('/login', { replace: true });
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);

    }
    useEffect(() => {



        Userlogout();

    }, [])



    return (
        <> 
         {Loading && (
            <div className="loader-containerLogout">
                <Loader color="pink" height={100} width={100} />
            </div>
        )}
            
                <div className={`LogoutContainer ${Loading===true}?'opacitycontainer':''`}>
WE ARE LOGGING YOU OUT
                </div>

            
=======
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
        
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b






<<<<<<< HEAD
        </>
    )
=======


    </>
  )
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
}

export default Logout