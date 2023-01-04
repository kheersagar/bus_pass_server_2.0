
const transporter = require("./Email");

const AddValidatorEmailTransporter = (email, username) => {
  // const temp = template(email, otp);

  var mailOptions = {
    from: "rahhar848@gmail.com",
    to: email,
    subject: "New Account created",
    html: `<div>
        <h1>Hello ${email}!</h1>
        <h2>Your username is ${username}</h2>
        <h3>Open Up app and reset your password</h3>
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

module.exports = { AddValidatorEmailTransporter };