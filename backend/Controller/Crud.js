


require("dotenv").config();
const User = require("../Collection/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSKEY,
  },
});

const Crud = {
  // LOGIN FUNCTION
login: async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Save user session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // ✅ Send success response to frontend
    res.status(200).json({
      message: "Login successful",
      user: req.session.user,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
},
  // REGISTER FUNCTION
  create: async function (req, res) {
    try {
      const { name, email, passw, age } = req.body;

      if (!name || !email || !passw || !age) {
        return res.status(400).json({ msg: "All Fields Are Required" });
      }

      const email_check = await User.findOne({ email });
      if (email_check) {
        return res.status(409).json({ msg: "Email Already Exists" });
      }

      const hashed_pass = bcrypt.hashSync(passw, 10);

      const newUser = new User({
        name,
        email,
        password: hashed_pass,
        age,
      });

      await newUser.save();

      const emailBody = {
        to: email,
        from: process.env.EMAIL,
        subject: "Account Registered",
        html: `<h3>Hello ${name}</h3><p>Your account has been registered successfully.</p>`,
      };

      transporter.sendMail(emailBody, (err, info) => {
        if (err) console.log("Email error:", err);
        else console.log("Email sent:", info.response);
      });

      res.status(201).json({ msg: "User Registered Successfully" });
    } catch (error) {
      console.log("Error In Create:", error);
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = Crud;

