const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const database = require("./mongoDB_connection");

const authRouter = require("./routes/authRouter");
const passRouter = require("./routes/passRouter");
const userRouter = require("./routes/userRouter");
const { tokenCheck } = require("./middleware/Tokencheck");
app.get("/", (req, res) => {
  res.send("Server running");
});

// contact
app.post("/contact", async (req, res) => {
  try {
    const { fullName, phone, message, budget, email } = req.body;
    var mailOptions = {
      from: "rahhar848@gmail.com",
      to: email,
      subject: "Project Discussion",
      html: `<div>
          <h1>Hello ${email}!</h1>
          <h2>Thanks for contacting us!</h2>
          <h2>W'll reach back to you soon.</h2>
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
    var mailOptions = {
      from: "rahhar848@gmail.com",
      to: "santparja@gmail.com",
      subject: "Porject Discussion",
      html: `<div>
          <h1>Contact details</h1>
          <h3>email - ${email}, name - ${fullName}, phone - ${phone},budget- ${budget}</h3>
          <h3>message - ${message} </h3>
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
    res.status(200).send("Congrats!! Your Query is sent");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal server error");
  }
});
//

app.use("/auth", authRouter);
app.use(tokenCheck);
app.use("/user", userRouter);
app.use("/bus-pass", passRouter);

const PORT = process.env.PORT || 5000;
database();
app.listen(PORT, () => {
  console.log(
    "-------------server started on port " + PORT + " -----------------"
  );
});
