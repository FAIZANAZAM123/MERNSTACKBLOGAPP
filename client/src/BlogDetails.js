import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
const BlogDetails = () => {



  useEffect(() => {
    // getdata();
  }, [])
  const { blogId } = useParams();
  console.log(blogId);


  return (
    <>





    </>
  )
}

export default BlogDetails