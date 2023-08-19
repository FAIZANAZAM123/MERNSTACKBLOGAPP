const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['heading', 'paragraph', 'image'],
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: [ContentSchema], 
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Registration",
        required: true
    }
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
