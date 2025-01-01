const {Router} = require('express');
const user = require('../models/user');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middlewares/fetchUSer');
// const { body, validationResult } = require('express-validator');


const router = Router();
const JWT_SECRET = "Yash@1234";

//API for getting all users
router.get("/", async (req,res)=>{
    const User = await user.find();
    res.status(200).json(User);
});

//API for signup
router.post("/signup", async(req, res)=>{
    const body = req.body;
    let success = false;
    //Check for request body
    if(!body || !body.name || !body.email || !body.password){
        return res.status(400).json({success : success, "Error" : "All fields are mandatory"});
    }
    //Finding user weather user already exists or not
    let User = await user.find({"email" : body.email});
    if(User.length !== 0){
        return res.status(400).json({success : success, "Error" : "User already exits with this email"});
    }
    //Generating Salt
    const salt = await bcryptjs.genSalt(10);
    //Generating hash
    const secPassword = await bcryptjs.hash(body.password, salt);
    //Saving user in database
    User = await user.create({"name" : body.name, "email" : body.email, "password" : secPassword});
    //Generating token
    const jwtToken = jwt.sign(User.id, JWT_SECRET);
    res.status(201).json({success : true, jwtToken});
});

// router.post("/", [body('name').isLength({min : 3}), body('email').isEmail(), body('password').isLength({min : 4})], async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()});
//     }
//     const body = req.body;
//     const User = await user.create(body);
//     res.status(201).json(User);
// });

//API for login
router.post("/login", async(req, res)=>{
    const body = req.body;
    let success = false;
    //Check for req body
    if(!body || !body.email || !body.password){
        return res.status(400).json({success : success, "Error" : "All fields are mandatory"});
    }
    //Finding user using email
    const User = await user.findOne({"email" : body.email});
    if(!User){
        return res.status(400).json({success : success, "Error" : "Please check your credentials"});
    }
    //Comparing hased password with user password
    const passwordCompare = await bcryptjs.compare(body.password, User.password);
    if(!passwordCompare){
        return res.status(400).json({success : success, "Error" : "Please check your credentials"});
    }
    //Generating JWT token
    const jwtToken = jwt.sign(User.id, JWT_SECRET);
    res.status(200).json({success : true, jwtToken});
});

//API to get user details and login is required
router.post('/getUser', fetchUser, async (req, res)=>{
    try {
        //Getting email from req
        const userId = req.user;
        //Getting user from database
        const User = await user.findById(userId).select("-password");
        res.status(200).json({success : true, User});
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

module.exports = router;