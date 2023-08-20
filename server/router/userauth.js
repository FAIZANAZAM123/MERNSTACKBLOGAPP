const express = require('express');
const router = express.Router();
const user = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middleware/authenticate');
<<<<<<< HEAD
const nodemailer = require('nodemailer');
const {google}=require('googleapis');
const CLIENT_ID='1035114720658-os83srdr4ffqp750h7as3u4oporb06js.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URI='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//042wjE0-h2KnqCgYIARAAGAQSNwF-L9IrsptJhbRuCkK9c8VQBi6JHWeFLvepTNNlESzaXY9M1AIDKqSXnhqtHOHdP_8JCRl59ek'
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REFRESH_TOKEN);
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
=======
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b

router.post("/register", async (req, res) => {
    try {
        console.log(req.body.name);
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }


        const response = await user.findOne({ email: email });
        console.log(response);
        if (response && response.email === req.body.email) {
            console.log('response found');
            res.status(422).json({ error: 'User Already exists' })
        }
        else {
<<<<<<< HEAD
            const user1 = new user({ name: name, email: email, phone: phone, password: password, blogs: [] });
            await console.log(user1);
=======
            const user1 = new user({ name: name, email: email, phone: phone, password: password,blogs:[] });
await console.log(user1);
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
            await user1.save();
            if (user1) {
                res.status(201).json({ message: 'User Registered Successfully' });
            }
        }
    } catch (error) {
        console.log(error);

    }
});

router.post("/signin", async (req, res) => {

    try {
<<<<<<< HEAD

=======
        
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }
        const response = await user.findOne({ email: email });

        if (!response) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        console.log(response);
        const ismatch = await bcrypt.compare(password, response.password);
        if (response && response.email === email && ismatch) {
            const token = await response.generateAuthToken();
            console.log('The token is ', token);
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 1800000),
                httpOnly: true
            })
            res.status(201).json({
                message: "you are logged in successfully",
<<<<<<< HEAD
                userId: response._id
=======
                userId: response._id 
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
            });
        }
        else {
            res.status(500).json({ message: "invalid credentials" })

        }
    } catch (error) {
        console.log(error);
    }
});

// router.get("/home", authenticate, (req, res) => {
//     console.log("User authenticated. Sending user data.");
//     console.log('This is rootuser', req.rootuser);
//     res.send(req.rootuser);

// });

router.get("/logout", authenticate, (req, res) => {

<<<<<<< HEAD
    res.clearCookie('jwtoken', { path: '/' });
=======
    res.clearCookie('jwtoken',{path:'/'});
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
    res.send('User Logout');

});



router.get("/contact", authenticate, (req, res) => {
    console.log("User authenticated. Sending user data.");
    console.log('This is rootuser', req.rootuser);
    res.send(req.rootuser);

});
<<<<<<< HEAD
router.post("/contact", authenticate, async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.json({ message: 'Invalid Credentials' });
    }

    const data = await user.findOne({ _id: req.userID });

    if (data) {
        await data.addmessage(name, email, message);
        await data.save();
        res.status(200).json('Message sent successfully')
    }

});
router.post("/sendEmail", authenticate, async (req, res) => {

    const { email, message, bloggeremail } = req.body;
    console.log(bloggeremail);
    if(!message||!email||!bloggeremail){
        return res.json({message:"please fill all fields"});
    }
    else{
        const accessToken=await oAuth2Client.getAccessToken();
    console.log(email, message, bloggeremail);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:'OAuth2',
            user: 'faizanazam6980@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    });
    const mailOptions = {
        from:'faizanazam6980@gmail.com',
        to: bloggeremail,
        subject: 'Message from Blog App',
        text: message,
    };
    // try {
    //     await transporter.sendMail(mailOptions);
        
    //     res.status(200).json({ message: 'Email sent!' });
    // } catch (error) {
    //     console.error('Failed to send the email:', error);
    //     res.status(500).json({ error: 'Failed to send the email.' });
    // }
}
})
router.get("/getAll", authenticate, async (req, res) => {
    let Users;
    try {
        Users = await user.find();


    } catch (error) {
        console.log(error)
    }
    if (!Users) {
        return res.status(404).json({ message: "no user found" })
    }
    return res.status(200).json({ Users });
=======
router.post("/contact",authenticate, async(req, res) => {
   const {name,email,message}=req.body;
   if(!name||!email||!message){
    return res.json({message:'Invalid Credentials'});
   }

   const data=await user.findOne({_id:req.userID});
   
   if(data)
   {
    await data.addmessage(name,email,message);
    await data.save();
    res.status(200).json('Message sent successfully')
   }

});

router.get("/getAll", authenticate, async(req, res) => {
    let Users;
    try {
        Users=await user.find();

        
    } catch (error) {
        console.log(error)
    }
    if(!Users){
        return res.status(404).json({message:"no user found"})
    }
return res.status(200).json({Users});
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
});



router.get("/edituser", authenticate, (req, res) => {
    console.log("User authenticated. Sending user data.");
    console.log('This is rootuser', req.rootuser);
    res.send(req.rootuser);

});
router.get("/likedBlogs", authenticate, async (req, res) => {
    try {
        const userData = await user.findById(req.userID).populate('likedBlogs');
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData.likedBlogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/likeBlog/:blogId", authenticate, async (req, res) => {
    try {
<<<<<<< HEAD
        console.log("Comed here")

        const { blogId } = req.params;
        console.log(blogId);
=======
        const { blogId } = req.params;
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
        const userData = await user.findById(req.userID);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
<<<<<<< HEAD
        await userData.addliked(blogId);
=======
        userData.likedBlogs.push(blogId);
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
        await userData.save();
        res.status(200).json({ message: 'Blog liked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
<<<<<<< HEAD
router.delete("/unlikeBlog/:blogId", authenticate, async (req, res) => {
    try {
        console.log("comed here in delete")
        const { blogId } = req.params;
        const userData = await user.findById(req.userID);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        await userData.unlikeBlog(blogId);
        await userData.save();
        res.status(200).json({ message: 'Blog unliked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.patch("/editdata/:id", authenticate, async (req, res) => {
=======

router.patch("/editdata/:id",authenticate, async (req, res) => {
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        // Fetch the user based on ID
        const currentUser = await user.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
<<<<<<< HEAD
        currentUser.name = name;
=======

        // Check if another user has the same email

        // Update user details
        currentUser.name = name;        
>>>>>>> a6ee661a970a83dbcd118fbc3c776412c5a8675b
        currentUser.email = email;
        currentUser.phone = phone;
        currentUser.password = password;

        await currentUser.save();

        res.status(200).json({ message: 'User updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;