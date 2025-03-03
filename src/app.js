const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");



app.post('/signup',async (req,res)=>{
    const userObj = {
        firstName : "Abhishek",
        lastName  : "Pratap Singh",
        emailId   : "pratapabhishek@gmail.com",
        password  : "abhishek1234@"
    }
    // creating a new instance of the user model
    try {
      const user = new User(userObj);
      await user.save();
      res.status(200).send("User Added Successfully");
    } catch (error) {
       res.status(400).send("error saving the User :"+ error.message); 
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




















