const { generateAccessToken, generateRefreshToken } = require("../helpers/generateToken");
const OTP = require("../OTPSchema");
const User = require("../UserSchema");
const { EmailTransporter } = require("../EmailTransporter");
var newOTP = require('otp-generators')
const Validator = require("../ValidatorSchema");
const bcrypt = require('bcrypt');
const userSession = require("../sessionSchema");
const { decodeJwt } = require("../helpers/decodeJWT");

const loginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await User.findOne({ username: username});
    if(!result){
      res.status(400).send("No user found!")
    }else{
    if (result && await bcrypt.compare(password, result.password)){
      const jwtEncryptData = {
        'username' : result.username,
        '_id'  : result._id,
        'role':result.role
      }
  
      const token = generateAccessToken(jwtEncryptData)
      const refreshToken = generateRefreshToken(jwtEncryptData)
      await userSession.deleteMany({user_id: result._id})
      await userSession.create({
        user_id: result._id,
        refreshToken: refreshToken
      })
      res.send({
        token: token,
        data:result
      })
    }else{
      res.status(401).send("Invalid password")
    }
  }
  }catch(err){
    console.log(err)
    res.status(401).send(err.message)
  }
}
const adminLoginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await User.findOne({ username: username});
    if(!result){
      res.status(400).send("No user found!")
    }else{
    if (result && await bcrypt.compare(password, result.password)){
      const jwtEncryptData = {
        'username' : result.username,
        '_id'  : result._id,
        'role':result.role
      }
      if(result.role !== 'admin' ) return res.status(403).send('Not an Admin')

      const token = generateAccessToken(jwtEncryptData)
      const refreshToken = generateRefreshToken(jwtEncryptData)
      await userSession.deleteMany({user_id: result._id})
      await userSession.create({
        user_id: result._id,
        refreshToken: refreshToken
      })
      res.send({
        token: token,
        data:result
      })
    }else{
      res.status(400).send("Invalid password")
    }
  }
  }catch(err){
    console.log(err)
    res.status(401).send(err.message)
  }
}
const validatorLoginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await Validator.findOne({ username: username});
    if(!result){
      res.status(400).send("No user found!")
    }else{
    if (result && await bcrypt.compare(password, result.password)){
      const jwtEncryptData = {
        'username' : result.username,
        '_id'  : result._id,
        'role':result.role
      }
  
      const token = generateAccessToken(jwtEncryptData)
      const refreshToken = generateRefreshToken(jwtEncryptData)
      await userSession.deleteMany({user_id: result._id})
      await userSession.create({
        user_id: result._id,
        refreshToken: refreshToken
      })
      res.send({
        token: token,
        data:result
      })
    }else{
      res.status(401).send("Invalid password")
    }
  }
  }catch(err){
    console.log(err)
    res.status(401).send(err.message)
  }
}
const logout = async (req,res)=>{
  try{
    const token = req.headers['x-access-token'];
    const isValid = decodeJwt(token)
    await userSession.deleteMany({user_id: isValid._id})
    res.send('Looged out')
  }catch(err){
    console.log(err)
    res.status(501).send(err.message)
  }
}
const forgotPassword = async (req,res)=>{
  const {email} = req.query
  console.log(req.query)
  try{
    const userData = await User.findOne({email}) 
    if(!userData) return res.status(403).send("Email not found!!")
    const isOtp = await OTP.findOne({user_id : userData._id})
    if(isOtp){
      return res.send("OTP Already sent!!")
    }
    const otp = Number(newOTP.generate(6, { alphabets: false, upperCase: false, specialChar: false }));
    console.log(otp)
    await OTP.create({otp,user_id:userData._id})
    EmailTransporter(email, otp);
    res.send("OTP sent!!")
  }catch(err){
    console.log(err)
    res.status(500).send(err.message)
  }
}
const confirmPassword = async (req,res)=>{
  const {password,otp} = req.body
  console.log(req.body)
  try{
    const isOtp = await OTP.findOne({otp})
    if(!isOtp){
      return res.status(501).send("Invalid OTP")
    }
   const  _id = isOtp.user_id 
   let encryptedPassword = await bcrypt.hash(password,10)
    await User.findOneAndUpdate({_id}, {password : encryptedPassword})
    res.send("Password Updated Successfully!!") 
  }catch(err){
    console.log(err.message)
    res.status(500).send(err.message)
  }
}
module.exports = {loginController,adminLoginController,forgotPassword,confirmPassword,validatorLoginController,logout}