
const transporter = require("./Email");

const EmailTransporter = (email, otp) => {
  // const temp = template(email, otp);

  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: email,
    subject: "Bus Pass Reset Password",
    html: `<div>
        <h1>Hello ${email}!</h1>
        <h2>Your OTP is ${otp} valid only for 10 mins</h2>
      </div>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log("called");
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};

module.exports = { EmailTransporter };