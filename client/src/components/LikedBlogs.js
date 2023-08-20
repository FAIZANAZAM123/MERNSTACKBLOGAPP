import React, { useEffect, useState } from 'react'
import { RotatingSquare as Loader } from 'react-loader-spinner';
import './Styles/LikedBlogs.css'
import { useNavigate } from 'react-router-dom';

const LikedBlogs = () => {
    const [AllLiked, setAllLiked] = useState([])
    const [loading, setLoading] = useState(false);  // New loading state
const navigate=useNavigate();
    const profileuser = async () => {
        try {
            const response = await fetch('/edituser', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            
            const data = await response.json();

            if (response.status !== 200 || !data) {
                console.error("Error in response:", data);
                throw new Error(response.error);
            }
        } catch (error) {
            navigate('/login', { replace: true });
        }
    }
    const GetLikedBlogs = async () => {
        try {
            setLoading(true); // Start loading

            const response = await fetch('/likedBlogs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (response.ok) {
                const likedBlogs = await response.json();
                console.log(likedBlogs, "These are liked bogs");
                await setAllLiked(likedBlogs);
                await console.log(AllLiked, "in rray");


            } else {
                console.error('Failed to fetch liked blogs:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching liked blogs:', error);
        }
        setLoading(false);
    }
    useEffect(() => {
        profileuser();
        GetLikedBlogs();

    }, [])



    return (
        <div className="main-containerlikedblogs">
            {loading && (
                <div className="loader-containerlikedblogs">
                    <Loader color="pink" height={100} width={100} />
                </div>
            )}
            <div className="blog-content">
                {AllLiked&&AllLiked.length>0?AllLiked.map((blog, blogIndex) => (
                    blog.content && blog.content.map((item, itemIndex) => {
                        switch (item.type) {
                            case "heading":
                                return <h1 key={`${blogIndex}-${itemIndex}`}>{item.value}</h1>;
                            case "paragraph":
                                return <p key={`${blogIndex}-${itemIndex}`}>{item.value}</p>;
                            case "image":
                                return <img key={`${blogIndex}-${itemIndex}`} src={item.value} alt="Blog content" />;
                            default:
                                return null;
                        }
                    })
                )):'YOU HAVE NO LIKED BLOGS'}
            </div>
        </div>
    );
    
    
}

export default LikedBlogs