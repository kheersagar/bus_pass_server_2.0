
const BusPass = require('../BusPassSchema');
const User = require('../UserSchema');
const jwt = require("jsonwebtoken");
const { generateQR } = require('../helpers/generateQr');
const applyPassController = async (req,res)=>{
  const data = req.body;
  console.log(req.body)
  try{
    const result = await BusPass.create({
      user_id : data._id,
      user_details : data,
      status: 1,
    })
    await User.findByIdAndUpdate(data._id,{status:1,bus_pass_id:result._id})
    const userData = await User.findOne({_id:data._id})
    res.send(userData);
  }catch(err){
    console.log(err)
    res.status(501).send(err)
  }
}
const getPassController = async (req,res) =>{
  try{   
    const token = req.headers['x-access-token']
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,data)=>{
      if(err){
        return res.status(403).send(err)
      }
      const user_id = data._id
      const userData  = await User.findOne({_id:user_id}).populate('bus_pass_id')
      console.log(userData)
      if(userData.status === 2){
        res.send(userData.bus_pass_id)
      }else{
        res.status(503).send('No Data found')
      }
    })
  }catch(err){
    console.log(err)
    res.status(501).send(err)
  }
}


//admin

const getAdminPassController = async (req,res) =>{
  const {page,limit} = req.query
  let query = { isResource: true };
  if (req.query.search) {
    query.$text = {$search : req.query.search.trim()}
    }
  console.log(req.query,query)
  try{   
      const userData  = await User.find({status:1}).find(query).skip(limit*(page-1)).limit(limit).populate('bus_pass_id')
      console.log(userData.length)
      res.send(userData)
  }catch(err){
    console.log(err)
    res.status(501).send(err)
  }
}
const getUserData = async (req,res) =>{
  const {_id} = req.body
  try{   
    const userData  = await BusPass.find({_id})
    res.send(userData)
}catch(err){
  console.log(err)
  res.status(501).send(err)
}
}
const updatePassController = async (req,res)=>{
  try{
    const {bus_pass_id,user_id,status,decline_reason,valid_till,bus_no} = req.body
    const result = await BusPass.findOne({_id:bus_pass_id})
    if(status == 2){
      const encoded_data = await generateQR("test")
      result._doc.qr_code = encoded_data
    }
    const temp = {...result._doc}
    temp.status = status
    temp.decline_reason = decline_reason
    temp.valid_till = valid_till
    temp.bus_no = bus_no
    delete temp._id
    delete temp.createdAt
    const newData = await BusPass.create({...temp})
    await User.findByIdAndUpdate( user_id,{bus_pass_id:newData._id ,status})
    res.send('Updated Successfully')
  }catch(err){
    console.log(err)
    res.status(501).send(err)
  }
}
module.exports = {applyPassController,updatePassController,getPassController,getAdminPassController}