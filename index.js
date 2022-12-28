const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const database = require("./mongoDB_connection");

const authRouter = require("./routes/authRouter")
const passRouter = require("./routes/passRouter");
const userRouter = require("./routes/userRouter");
const { tokenCheck } = require("./middleware/Tokencheck");
app.get("/",(req,res)=>{
  res.send("Server running")
})

app.use("/auth",authRouter)
app.use(tokenCheck)
app.use("/user",userRouter)
app.use("/bus-pass",passRouter)

const PORT =  process.env.PORT || 5000 
database();
app.listen(PORT,()=>{
  console.log("-------------server started on port " + PORT + " -----------------")
})


