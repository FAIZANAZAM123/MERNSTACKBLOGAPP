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
    },
    comments:[
        {
        comment:{
            type:String,
            required:true
        }
    }
    ]
});


BlogSchema.methods.addcomment = async function(comment) {
    try {
        this.comments = this.comments.concat({ comment:comment});


        await this.save();
        return this.comments;


    } catch (error) {

    }
}
<<<<<<< HEAD



=======
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
const Blog = mongoose.model("Blog", BlogSchema);


module.exports = Blog;
