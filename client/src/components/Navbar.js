import React, { useContext } from 'react';
import { UserContext } from '../App';


import { Link } from 'react-router-dom';
import './Styles/Navbar.css';
const Navbar = () => {
    const { state } = useContext(UserContext);
<<<<<<< HEAD
    // const [Search, setSeacrch] = useState('');
=======
// const [Search, setSeacrch] = useState('');
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b


    return (
        <>
<<<<<<< HEAD

            <nav style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/image.jpeg'})` }} className="navbar navbar-expand-lg">

                <div className="container-fluid">
                    <Link className="navbar-brand animated-logo" to="/">
                        <span className="logo-icon"><i className="fas fa-blog"></i></span>
                        <span className="logo-text1 blogapp">BlogAPP</span>
                    </Link>
=======
            <nav  className="navbar navbar-expand-lg">
              
                <div className="container-fluid">
                <Link className="navbar-brand animated-logo" to="/">
    <span className="logo-icon"><i className="fas fa-blog"></i></span>
    <span className="logo-text1 blogapp">BlogAPP</span>
</Link>
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b

                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
<<<<<<< HEAD

=======
                 
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">


                            {state.isLoggedIn === true ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link links" aria-current="page" to="/Home"><i className="fas fa-home"></i> Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/profile"><i className="fas fa-address-card"></i> My Profile</Link>
                                    </li>
<<<<<<< HEAD
                                    {/* <li className="nav-item">
                                        <Link className="nav-link links" to="/contact"><i className="fas fa-envelope"></i> Contact</Link>
                                    </li> */}
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/addblog"><i className="fas fa-pen"></i> Addblog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/myblogs"><i className="fas fa-book-open"></i> MyBlogs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/likedblogs"><i class="fas fa-heart" ></i> LikedBLogs</Link>
                                    </li>



=======
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/contact"><i className="fas fa-envelope"></i> Contact</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/addblog"><i className="fas fa-envelope"></i> Addblog</Link>
                                    </li>
                                     <li className="nav-item">
                                        <Link className="nav-link links" to="/myblogs"><i className="fas fa-envelope"></i>MyBlogs</Link>
                                    </li>
                                    
                                
                                    
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b

                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link links" to="/signup"><i className="fas fa-user-plus"></i> Signup</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;



