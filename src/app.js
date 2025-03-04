const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());


// creating a new instance of the user model
app.post('/signup',async (req,res)=>{
    try {
      const data = req.body;  
      const user = new User(data);
      await user.save();
      res.status(200).send("User Added Successfully");
    } catch (error) {
       res.status(400).send("error saving the User :"+ error.message); 
    }
})

//  Find user by email
app.get("/user",async (req,res)=>{
    try {
    const useremail = req.body.emailId;
    const user = await User.find({emailId: useremail});
    if(user.length === 0 ){
        res.status(404).send("User Not found");
    }else{
        res.send(user);
    }
    } catch (error) {
        res.status(400).send("error getting the User :"+ error.message);
    }
})

//  Feed API  - GET/feed - get all the user from the database
app.get("/feed",async (req,res)=>{
   try {
    const user = await User.find({});
    res.send(user);
   } catch (error) {
    res.status(400).send("Somthing went wrong");
   }
})

// Delete a user from the database
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id:userId});
        res.send("user deleted successfully");
    } catch (error) {
        res.status(400).send("Somthing went wrong");
    }
})

// Update data of the user
app.patch("/user",async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("User updated successfully");
    } catch (error) {
        res.status(400).send("Somthing went wrong"); 
    }
})
connectDB()
.then(()=>{
console.log("Database connection is estiblished")
app.listen(3000,()=>{
    console.log(`server is running at port : 3000`);
});
})
.catch(error=>{
    console.error("Database connection is not estiblished")
});




















