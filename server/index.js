const express = require("express");
const app = express();
const firebase = require("./routes/firebase");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const passengerRoute = require("./routes/passengerRoute");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// parsing to json body
app.use(express.json());

// connecting to database
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("The Connection with DB has been established!")
}).catch(err=> console.log({err, msg: "DB couldn't be connected!"}))
// using cors for differnet ports
app.use(cors());
// router
app.use("/api/firebase", firebase);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/passenger", passengerRoute);
// backend server
app.listen(process.env.PORT, () => console.log("Backend server is ready and running on " + process.env.PORT));