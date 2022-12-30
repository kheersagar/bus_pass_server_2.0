const { generateAccessToken } = require("../helpers/generateToken");
const User = require("../UserSchema");

const loginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await User.findOne({ username: username, password: password });
    const jwtEncryptData = {
      'username' : result.username,
      '_id'  : result._id,
      'role' : result.role
    }
    const token = generateAccessToken(jwtEncryptData)
    res.send({
      token: token,
      data:result
    })
  }catch(err){
    console.log(err)
    res.status(401).send("Invalid username or password")
  }
}
const adminLoginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await User.findOne({ username: username, password: password });
    const jwtEncryptData = {
      'username' : result.username,
      '_id'  : result._id,
      'role' : result.role
    }
    if(result.role !== 'admin' ) return res.status(403).send('Not an Admin')

    const token = generateAccessToken(jwtEncryptData)
    res.send({
      token: token,
      data:result
    })
  }catch(err){
    console.log(err)
    res.status(401).send("Invalid username or password")
  }
}
module.exports = {loginController,adminLoginController}