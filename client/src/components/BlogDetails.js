import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchblogsbyID } from '../store/slices/blogSlice';
import { RotatingSquare as Loader } from 'react-loader-spinner';
import { Circles as Loader1 } from 'react-loader-spinner';
import { UserContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';
import './Styles/BlogDetails.css'
const BlogDetails = () => {
  const { blogId } = useParams();
  const ref = useRef(null);
  const { state } = useContext(UserContext);
  const { userId,userName} = state;
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blog.items);
  const blogStatus = useSelector((state) => state.blogs.blog.status);
  const blogError = useSelector((state) => state.blogs.blog.error);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const bloggeremail = blogs && blogs.user ? blogs.user.email : '';
  console.log("This is the name",userName);
  const handleLike = async () => {
    setIsLiked(!isLiked);
    const url = isLiked ? '/unlikeBlog/' + blogId : '/likeBlog/' + blogId;
    const method = isLiked ? 'DELETE' : 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setIsLiked(!isLiked);
      } else {
        console.error('Failed to update like status:', data.error);
      }
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  };
  const addComment = async (blogId, commentInput) => {
    setIsCommentLoading(true);
    setCommentInput('');
    console.log(blogId);
    console.log(commentInput);
    const response = await fetch('/savecomment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        blogId, commentInput, userId
      }),
      credentials: 'include',
    });

    const data = await response.json();
    if (data) {

      setComments(prevComments => [
        {
            comment: commentInput,
           
        },
        ...prevComments
    ]);      setCommentInput('');

    }
    if (!data) {
      console.log('comment not saved');
    }
    // dispatch(fetchblogsbyID(blogId));


    setIsCommentLoading(false);

  }
  const getdata = async () => {
    console.log(blogId);
    dispatch(fetchblogsbyID(blogId));

    if (blogs && blogs.comments) {
      setComments([...blogs.comments].reverse());
    }
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
          if (element._id === blogId) {
            setIsLiked(true);
          }
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

  }, [])
  useEffect(() => {
    if (blogs && blogs.comments) {

      setComments([...blogs.comments].reverse());
    }
  }, [blogs]);
  console.log(blogs);
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
    return navigate('/login', { replace: true });
  }
  return (
    <>
      <div className='blogContainer'>
        {
          blogs && blogs.content && blogs.content.map((blog, idx) => {
            switch (blog.type) {
              case 'heading':
                return <h1 className='blogHeading' key={idx}>{blog.value}</h1>;
              case 'paragraph':
                return <p className='blogParagraph' key={idx}>{blog.value}</p>;
              case 'image':
                return <img src={blog.value} alt="Blog related image" className='blogImage' key={idx} />;
              default:
                return null;
            }
          })}
        <svg
          onClick={handleLike}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isLiked ? "red" : "grey"}
          width="40px"
          height="40px"
          style={{ cursor: 'pointer' }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <button>
          <Link style={{ textDecoration: "none", color: 'white' }} to={`/contactblogger/${bloggeremail}`}> Contact Blogger </Link>
        </button>
      </div>

      <h1 className='bg-dark text-light COMMENTS '>COMMENTS</h1>
      <div className='commentsSection m-0'>


        <ul className="list-group">
          {blogs && blogs.comments && comments && comments.map((commentObj, index) => (

            <li className="list-group-item" key={index}>
              <i className="fas fa-user-circle fa-2x mr-2"></i>
              <span className=' spanBlogdetails' >
                {console.log("this is UserName",userName)}
              {commentObj.user ? commentObj.user.name :userName}</span>
              <br />
              {commentObj.comment }
            </li>
          ))}
        </ul>

        {isCommentLoading &&
          <div className=" d-flex justify-content-center comment-loader-container ">
            <Loader1
              color="black"
              height={80}
              width={100}
            />
          </div>
        }
        {/* Add new comment */}

        <form method="post" ref={ref}>
          <h1 className='text-danger text-center'  >LEAVE A REPLY....</h1>
          {console.log(ref)}
          <div className='addComment'>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={(e) => {
              e.preventDefault();
              addComment(blogId, commentInput);
            }}>Post Comment</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default BlogDetails





