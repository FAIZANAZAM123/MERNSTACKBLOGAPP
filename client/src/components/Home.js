import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchblogs } from '../store/slices/blogSlice';
import { useNavigate, Link } from 'react-router-dom';
import { RotatingSquare as Loader } from 'react-loader-spinner';
import './Styles/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.allBlogs.items);
    const blogStatus = useSelector((state) => state.blogs.allBlogs.status);
    const blogError = useSelector((state) => state.blogs.allBlogs.error);
    const [searchTerm, setSearchTerm] = useState('');
    const [LikedBlogs, setLikedBlogs] = useState([]);
    const [clickedlike, setclickedlike] = useState();

    const handleLike = async (blogId) => {
        console.log(blogId, "In the home")
        console.log("I JANDLE CLIS", LikedBlogs);
        setclickedlike(blogId); // Set the clicked blog ID

        const currentlyLiked = LikedBlogs.includes(blogId);
        const newLikedBlogs = currentlyLiked ? LikedBlogs.filter(id => id !== blogId) : [...LikedBlogs, blogId];

        const url = currentlyLiked ? '/unlikeBlog/' + blogId : '/likeBlog/' + blogId;
        const method = currentlyLiked ? 'DELETE' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                }),
                credentials: 'include', // Include cookies for authenticated requests
            });

            const data = await response.json();

            if (response.ok) {
                setLikedBlogs(newLikedBlogs);
            } else {
                console.error('Failed to update like status:', data.error);
            }
        } catch (error) {
            console.error('Error liking/unliking blog:', error);
        }
    };

    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }
    const getdata = async () => {
        dispatch(fetchblogs());

        try {
            const response = await fetch('/likedBlogs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (response.ok) {
                const likedBlogs = await response.json();
                console.log(likedBlogs, "These are liked bogs")

                likedBlogs.forEach(element => {
                    setLikedBlogs(prevLikedBlogs => [...prevLikedBlogs, element._id]);
                    console.log(LikedBlogs, "CONSOLED LIKE BLOGS");

                });

            } else {
                console.error('Failed to fetch liked blogs:', await response.text());
            }
        } catch (error) {
            console.error('Error fetching liked blogs:', error);
        }

    }
    useEffect(() => {
        getdata();

    }, []);

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
        navigate('/login', { replace: true });
        return <div>Error occurred!</div>;
    }

    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="homecontainer container ">

                <div className="row mt-3">
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {
                        blogs && blogs.length > 0 ? (
                            <div className="blog-card">
                                {filteredBlogs.map((blog) => {
                                    let hasRenderedHeading = false;
                                    let hasRenderedParagraph = false;
                                    let hasRenderedImage = false;

                                    return (
                                        <div key={blog._id} className="card innerhomecard col-3 me-2 mb-4">
                                            {blog.content.map((item, idx) => {
                                                switch (item.type) {
                                                    case 'heading':
                                                        if (!hasRenderedHeading) {
                                                            hasRenderedHeading = true;
                                                            return <h1 className="card-title innercard-title" key={idx}>{item.value}</h1>;
                                                        }
                                                        break;
                                                    case 'paragraph':
                                                        if (!hasRenderedParagraph) {
                                                            hasRenderedParagraph = true;
                                                            const string = item.value;
                                                            return <p className="innercard-text card-text" key={idx}>{string.length > 90 ? truncateString(string, 90) : string}</p>;
                                                        }
                                                        break;
                                                    case 'image':
                                                        if (!hasRenderedImage) {
                                                            hasRenderedImage = true;
                                                            return (
                                                                <img key={idx} src={item.value} className="card-img-top innercard-img-top" alt="Blog Content" />
                                                            );
                                                        }
                                                        break;
                                                    default:
                                                        return null;
                                                }
                                                return null;
                                            })}
                                            <div className="innercard-body">
                                                <Link to={`/blogdetails/${blog._id}`} className="btn btnhome">Read More{console.log(blog._id)}</Link>

                                            </div>

                                            <svg
                                                onClick={() => {
                                                    handleLike(blog._id);
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={LikedBlogs.includes(blog._id) ? "red" : "grey"}
                                                width="40px"
                                                height="40px"
                                                className={blog._id === clickedlike ? "clicked-svg" : ""}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>



                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center">You have no blogs.</p>
                        )
                    }
                </div>

            </div>
        </>
    );
}

export default Home;




