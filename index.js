const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const database = require("./mongoDB_connection");

const PORT = 5000 || process.env.PORT
app.listen(PORT,()=>{
  console.log("-------------server started on port " + PORT + " -----------------")
  database();
})


