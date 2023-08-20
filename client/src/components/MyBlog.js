import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserBlogs } from '../store/slices/blogSlice';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { RotatingSquare as Loader } from 'react-loader-spinner';

const MyBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.userBlogs.items);
    const blogStatus = useSelector((state) => state.blogs.userBlogs.status);
    const blogError = useSelector((state) => state.blogs.userBlogs.error);
    const { state } = useContext(UserContext);
    const { userId } = state;

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
    useEffect(() => {
        profileuser();
        dispatch(fetchUserBlogs(userId));
    }, [dispatch, userId]);

    if (blogStatus === 'loading') {
        return <div className="loader-container">
        <Loader
          color="pink"
          height={100}
          width={100}
        />
      </div>
    }

    if (blogStatus === 'failed') {
        
    }

    return (
        <div>
            <h2>My blogs</h2>
            {blogs && blogs.length > 0 ? (
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog._id}>
                            {blog.content.map((item, idx) => {
                                switch (item.type) {
                                    case 'heading':
                                        return <h3 key={idx}>{item.value}</h3>;
                                    case 'paragraph':
                                        return <p key={idx}>{item.value}</p>;
                                    case 'image':
                                        return (
                                            <img
                                                key={idx}
                                                src={item.value}
                                                alt="Blog content"
                                            />
                                        );
                                    default:
                                        return null;
                                }
                               
                            })
                            
                            }
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no blogs.</p>
            )}
        </div>
    );
};

export default MyBlog;
