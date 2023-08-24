import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Signup.css';

const Signup = () => {
const navigate=useNavigate();
    const [userdata, setuserdata] = useState([{
        name:'',email:'',phone:'',password:''
    }]);
    const storedata=(event)=>{
        const name=event.target.name;
       const value=event.target.value;
        setuserdata({...userdata,[name]:value});
        console.log(userdata);
    }
const senddata=async(e)=>{
    e.preventDefault();

const {name,email,phone,password}=userdata;

const res=await fetch('/register',{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
  body:JSON.stringify({
    name,email,phone,password
  })
})
const response=await res.json();
if(res.status===422 ||!response){
    window.alert('Invalid Credentials');
}
else{
    window.alert('Registered successfully');
    navigate("/login", { replace: true });
}
}
    return (
        <>
            <div className="container mt-4" id="signup-container">
    <div className="row justify-content-center" id="signup-row">
        <div className="col-8" id="signup-col">
            <div  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/image.jpeg'})` }} className="card p-4 shadow animated-formsignup" id="signup-card">
                            <h2 className="text-center mb-4">BlogApp Signup</h2>
                            <form method="POST">

                                <div className="mb-3">
                                    <label for="name" className="form-label">Name  <i class="fas fa-user"></i>  </label>
                                    <input type="text" name='name' onChange={storedata} className="form-control input-field" id="name" placeholder="Enter your name" />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email <i class="fas fa-envelope"></i></label>
                                    <input type="email" name='email'  onChange={storedata} className="form-control input-field" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label for="phone" className="form-label">Phone <i class="fas fa-phone"></i></label>
                                    <input type="tel" name='phone' onChange={storedata} className="form-control input-field" id="phone" placeholder="Enter your phone number" />
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password <i class="fas fa-lock"></i>
                                    </label>
                                    <input type="password" name='password'  onChange={storedata} className="form-control input-field" id="password" placeholder="Enter a password" />
                                </div>
                                <button onClick={senddata} type="submit" className="btn signupbtn mt-3">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
