const { generateAccessToken } = require("../helpers/generateToken");
const User = require("../UserSchema");

const loginController = async (req,res)=>{
  const { username, password } = req.body;
  console.log(req.body)
  try{
    const result = await User.findOne({ username: username, password: password });
    const token = generateAccessToken(req.body)
    res.send({
      token: token,
      data:result
    })
  }catch(err){
    console.log(err)
    res.status(401).send(err)
  }
}

module.exports = {loginController}