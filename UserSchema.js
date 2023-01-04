const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
    unique: true,
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
  status: {
    type: Number,
  },
  decline_reason:{
    type:String
  },
  bus_pass_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref :'BusPass',
  },
  profile_img:{
    type:String
  },
  receipt_img: {
    type: String,
  },
  qr_code:{
    type:String
  }

});
userSchema.index({"$**": "text"})
userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt

      // hash the password using our new salt
      bcrypt.hash(user.password, 10, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
});
const user = mongoose.model("user", userSchema);


module.exports = user;
