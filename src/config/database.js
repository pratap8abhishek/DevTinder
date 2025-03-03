const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect(
        "mongodb+srv://Abhishek:12345@cluster0.dcqci.mongodb.net/devTinder"
        );
};
module.exports = connectDB;





