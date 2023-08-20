const express = require('express');
const router = express.Router();
const user = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middleware/authenticate');

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
            const user1 = new user({ name: name, email: email, phone: phone, password: password,blogs:[] });
await console.log(user1);
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
                userId: response._id 
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

    res.clearCookie('jwtoken',{path:'/'});
    res.send('User Logout');

});



router.get("/contact", authenticate, (req, res) => {
    console.log("User authenticated. Sending user data.");
    console.log('This is rootuser', req.rootuser);
    res.send(req.rootuser);

});
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
        const { blogId } = req.params;
        const userData = await user.findById(req.userID);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        userData.likedBlogs.push(blogId);
        await userData.save();
        res.status(200).json({ message: 'Blog liked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch("/editdata/:id",authenticate, async (req, res) => {
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

        // Check if another user has the same email

        // Update user details
        currentUser.name = name;        
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