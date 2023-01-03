const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    index: { expires: "10m" },
  },
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;