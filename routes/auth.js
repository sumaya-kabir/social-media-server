const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// Register
router.post("/register",async (req,res)=> {
        
        try{
            // password
            const salt = await bcrypt.genSalt(10);
            const hashedPass= await bcrypt.hash(req.body.password, salt);

            // create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            })

            // saved user
            const user = await newUser.save()
            res.status(200).json(user)
        }
        catch(err){
            console.error(err)
        }
})

// login
router.post('/login', async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json("user.not found")
        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.send(400).json("Wrong Password")
    }
    catch(err){
        console.error(err)
    }
})

module.exports = router