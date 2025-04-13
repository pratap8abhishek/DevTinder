const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
//    Read the token from req cookies
   try {
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not valid !!!!!!");
    }
    const decodedobj = await jwt.verify(token,"DEV@Tinder$790")
    const {_id} = decodedobj;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("User is not found");
    }
    req.user = user;
    next();
   } catch (error) {
     res.status(400).send("ERROR",+ error.message);
   }
// find the user
}
module.exports = {userAuth};















