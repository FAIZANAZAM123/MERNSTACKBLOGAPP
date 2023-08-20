const express = require('express');
const Blogrouter = express.Router();
const Blog = require('../model/Blog')
const users=require('../model/users');
const mongoose = require("mongoose"); 
const authenticate = require('../Middleware/authenticate');
Blogrouter.get('/getBlogs',authenticate, async (req,res) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (error) {
        console.log(error);
    }
if(!blogs){
    return res.status(404).json(
        { message: "No Blog Found" })
}
return res.status(200).json({blogs})

});
Blogrouter.get('/getBlogs/:id',authenticate,  async (req, res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id).populate('user');
    
    } catch (err) {
      return console.log(err);
    }
    
   
    if (!blog) {
      return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blog });



});





Blogrouter.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    
    try {
        const userBlogs = await users.findById(userId).populate("blogs");
        
        if (!userBlogs || userBlogs.blogs.length === 0) {
            return res.status(404).json({ message: "No Blog Found for the given user ID" });
        }
        
        return res.status(200).json({ user: userBlogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});





Blogrouter.post('/addblog', authenticate, async (req, res) => {
    const { title, content, user } = req.body;

    let exists;
    try {
        exists = await users.findById(user);
    } catch (error) {
        return res.status(500).json({ message: "Database Error: " + error });
    }
    
    if (!exists) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const blog = new Blog({
        title,
        content,   
        user
    });

    try { 
        const session = await mongoose.startSession();
        session.startTransaction();

        await blog.save({ session });
        exists.blogs.push(blog);
        await exists.save({ session });

        await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error: " + error });
    }
    return res.status(200).json({ blog });
});

Blogrouter.post("/savecomment",authenticate, async(req, res) => {
    const {blogId,commentInput}=req.body;
    if(!commentInput||!blogId){
     return res.json({message:'Invalid Credentials'});
    }
 
    console.log("THIS IS THE BLOG ID",blogId,"THIS IS THE INPUT",commentInput);
    const data=await Blog.findOne({_id:blogId});
    
    if(data)
    {
        console.log("Blog found, attempting to add comment...");

        await data.addcomment(commentInput);
        await data.save();
     res.status(200).json('Comment Added successfully')
    }
 
 });



module.exports=Blogrouter;