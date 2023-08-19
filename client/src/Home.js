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

    function truncateString(str, num) {
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    }
    useEffect(() => {
        dispatch(fetchblogs());
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
                                        return <p className="innercard-text card-text" key={idx}>{string.length>90?truncateString(string, 90):string}</p>;
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




