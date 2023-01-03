const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busPassSchema = new Schema({
  user_id :{
    type: String
  },
  user_details :{  
    username: {
      type: String,
    },
    role: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    branch: {
      type: String,
    },
    semester: {
      type: Number,
    },
    phone_no: {
      type: Number,
    },
    address: {
      type: String,
    },
    pickup_point: {
      type: String,
    },
    profile_img:{
      type:String
    },
    receipt_img: {
      type: String,
    },
  },
  status: {
    type: Number,
  },
  bus_no:{
    type: Number,
  },
  decline_reason:{
    type:String
  },
  valid_till:{
    type : Date,
  },
  qr_code:{
    type: String
  },
  createdAt:{
    type: Date,
    default: () => Date.now(),
  },
  updatedAt:{
    type: Date,
  }
});

busPassSchema.pre('save',function(next){
  this.updatedAt = Date.now()
  next();
})
const BusPass = mongoose.model("BusPass", busPassSchema);

module.exports = BusPass;
