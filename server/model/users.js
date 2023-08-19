const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },

    messages: [
        {
            name: {
                type: String,
                required: true
            }
            ,
            email: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog",
            required: true
        }


    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})
userSchema.methods.generateAuthToken = async function () {
    try {
        let tokenss = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({ token: tokenss })


        await this.save();
        return tokenss
    } catch (error) {

    }
}
userSchema.methods.addmessage = async function (name, email, message) {
    try {
        this.messages = this.messages.concat({ name: name, email: email, message: message });


        await this.save();
        return this.messages;


    } catch (error) {

    }
}


const User = new mongoose.model('Registration', userSchema);

module.exports = User;

