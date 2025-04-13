const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");




// creating a new instance of the user model
authRouter.post('/signup', async (req, res) => {
    try {
        // Validation of Data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encript the Password 
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
        await user.save();
        res.status(201).send("User Added Successfully");
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    }
}
)

authRouter.post('/login',async(req,res)=>{
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
           throw new Error("Invalid Crediential"); 
        }
        const ispasswordValid = await user.validatePassword(password);
        if(ispasswordValid){
           
            const token = await user.getJWT();
            // Add token to the cookie and send response back to the user
            res.cookie("token",token,{expires: new Date(Date.now()+ 8*3600000)});
            res.send("Login Successfully !!!");
        }else{
            throw new Error("Invalid Crediential ");
        }
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    }
}); 

authRouter.post('/logout', async(req,res)=>{
     res.cookie("token",null,{
        expires: new Date(Date.now()),
     });
     res.send("Logout Successful");
})


module.exports = authRouter;