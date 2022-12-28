const BusPass = require("../BusPassSchema");
const jwt = require("jsonwebtoken");
const User = require("../UserSchema");
const { decodeJwt } = require("../helpers/decodeJWT");
const csv=require('csvtojson')
const bcrypt = require('bcrypt')
const getUserData = (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        return res.status(403).send(err);
      }
      const user_id = data._id;
      const userData = await User.findOne({ _id: user_id });
      res.send(userData);
    });
  } catch (err) {
    res.status(501).send(err);
  }
};
const getNotification = (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
      if (err) {
        return res.status(403).send(err);
      }
      console.log(data);
      const user_id = data._id;
      const userData = await BusPass.find({ user_id }).sort({
        createdAt: "desc",
      });
      console.log(userData);
      if (!userData) {
        return res.send("No Notification");
      } else {
        res.send(userData);
      }
    });
  } catch (err) {
    res.status(501).send(err);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { _id } = decodeJwt(req.headers["x-access-token"]);
    await User.findByIdAndUpdate(_id, req.body);
    const result = await User.findOne({ _id });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(501).send(err);
  }
};

const createNewStudent = async (req, res) => {
  // const {
  //   username,
  //   password,
  //   role,
  //   first_nam,
  //   last_name,
  //   email,
  //   branch,
  //   semester,
  //   phone_no,
  //   address,
  //   pickup_point,
  //   status,
  //   decline_reason,
  //   bus_pass_id,
  //   profile_img,
  //   receipt_img,
  //   qr_code,
  // } = req.body;
  try{
    await User.create(req.body)
    res.send("Created Successfully")
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }

};

const createNewStudentCSV = async (req,res) => {
  console.log(req.body)
  try{
    const jsonArray = await csv().fromFile('./uploads/csv/studentCSV.csv');
    await User.create(jsonArray)
    res.send("Created Successfully")
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }

};

module.exports = { getNotification, getUserData, updateProfile,createNewStudent ,createNewStudentCSV};
