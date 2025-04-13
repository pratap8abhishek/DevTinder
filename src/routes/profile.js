const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("./middlewares/auth");
const {validateEditProfileData} = require("./utils/validation");



profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        res.status(400).send("ERROR :" + error.message);
    }
    });

profileRouter.patch('/profile/edit',userAuth, async(req,res)=>{
    try {
       if(!validateEditProfileData(req)){
         throw new Error("Invalid Edit Request");
       }
       const loggedInuser = req.user;
       Object.keys(req.body).forEach((key)=> (loggedInuser[key] = req.body[key]));
       await loggedInuser.save();
       res.json({
        meassage: `${loggedInuser.firstName}, your Profile Updated Successfuly`,
        data: loggedInuser,
});
    } catch (error) {
        res.status(400).send("ERROR :" + error.message); 
    }
})    






module.exports = profileRouter;