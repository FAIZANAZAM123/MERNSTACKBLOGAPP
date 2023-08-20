import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchblogsbyID } from '../store/slices/blogSlice';
import { RotatingSquare as Loader } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import './Styles/BlogDetails.css'
const BlogDetails = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blog.items);
  const blogStatus = useSelector((state) => state.blogs.blog.status);
  const blogError = useSelector((state) => state.blogs.blog.error);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
      setIsLiked(!isLiked);
    };
  const addComment = async (blogId, commentInput) => {
    
    console.log(blogId);
    console.log(commentInput);
    const response = await fetch('/savecomment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        blogId, commentInput
      }),
      credentials: 'include',



    })


    const data = await response.json();
    if (!data) {
      console.log('comment not saved');
    }
    else {
setCommentInput('');
window.location.reload();
    }
  }
  const getdata = async () => {
    console.log(blogId);
    dispatch(fetchblogsbyID(blogId));
  }

  useEffect(() => {
    getdata();
  }, [])

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
        {blogs && blogs.content && blogs.content.map((blog, idx) => {
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
          onClick={toggleLike} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isLiked ? "red" : "none"} 
          width="24px" 
          height="24px"
          style={{ cursor: 'pointer' ,border:"2px solid black"}}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <div className='commentsSection'>
        <h2>Comments</h2>

        Render existing comments
        <ul className='commentsList'>
          {blogs&&blogs.comments&&blogs.comments.map((blog, index) => (
            <li key={index}>{blog.comment}</li>
          ))}
        </ul>

        {/* Add new comment */}
        <form method="post">
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





