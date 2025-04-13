const express = require("express");
const requestRouter  = express.Router();
const {userAuth} = require("./middlewares/auth");


requestRouter.get('/sendConnectionRequest',async (req,res)=>{
    const user = req.user;
    // sending connection request
    console.log("sending a connection Request");
    res.send(user.firstName + "sent the connection request");
});
module.exports = requestRouter;