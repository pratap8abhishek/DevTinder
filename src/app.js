const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser);

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



//  Find user by email
// app.get("/user", async (req, res) => {
//     try {
//         const useremail = req.body.emailId;
//         const user = await User.find({ emailId: useremail });
//         if (user.length === 0) {
//             res.status(404).send("User Not found");
//         } else {
//             res.send(user);
//         }
//     } catch (error) {
//         res.status(400).send("error getting the User :" + error.message);
//     }
// })

// //  Feed API  - GET/feed - get all the user from the database
// app.get("/feed", async (req, res) => {
//     try {
//         const user = await User.find({});
//         res.send(user);
//     } catch (error) {
//         res.status(400).send("Somthing went wrong");
//     }
// })

// // Delete a user from the database
// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete({ _id: userId });
//         res.send("user deleted successfully");
//     } catch (error) {
//         res.status(400).send("Somthing went wrong");
//     }
// })

// // Update data of the user
// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try {
//         const ALLOWED_UPDATES = [
//             "skills",
//             "photourl",
//             "about",
//             "gender",
//             "age"
//         ]
//         const isUpdateAllowed = Object.keys(data).every((k) => {
//             ALLOWED_UPDATES.includes(k);
//         })
//         if (!isUpdateAllowed) {
//             throw new Error("Update not Allowed");
//         }
//         await User.findByIdAndUpdate({ _id: userId }, data, {
//             returnDocument: "after",
//             runValidators: true,
//         });
//         res.send("User updated successfully");
//     } catch (error) {
//         res.status(400).send("UPDATE FAILED:" + error.message);
//     }
// });
connectDB()
    .then(() => {
        console.log("Database connection is estiblished")
        app.listen(3000, () => {
            console.log(`server is running at port : 3000`);
        });
    })
    .catch(error => {
        console.error("Database connection is not estiblished")
    });



















