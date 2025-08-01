// const User = require("../Collection/User");
// const crypt = require("bcrypt");
// const mail = require("nodemailer");
// require("dotenv").config()

// const secure_info = mail.createTransport({
//     service:"gmail",
//     auth:{
//         user:process.env.EMAIL,
//         pass: process.env.PASSKEY
//     }
// })
// const Crud = {
//     create : async function (req, res) {
//         try{
//             const{name ,email , passw , age }= req.body;

//             if (!name || !email || !passw || !age) {
//                 return res.status(400).json({msg : "All Fields Are Required"});
//             }

//             const email_check = await User.findOne({email});
//             if (email_check) {
//                return  res.status(409).json({msg :"Email Already Exists"});
//             }

//             const crypt_pass = crypt.hashSync(passw,15);

//             const save_data = new User({
//                 name ,
//                 email ,
//                 password: crypt_pass,
//                 age : Number(age),
//             });
//             await save_data.save();

//             const EmailBodyInfo = {
//                 to: email,
//                 from : process.env.EMAIL,
//                 subject :"Account Registered",
//                 html:`<h3>Hello ${name}</h3> <p> Your Account HAs Been Successfully Registered . </p>`,

//             };
//             secure_info.sendMail(EmailBodyInfo, function(err, info){
//                 if (err) {
//                     console.log("Email Error:" , err);
                    
//                 } else {
//                     console.log("Email Sent:", info.response);
                    
//                 }
//             });
//             res.status(201).json({msg : "User Registered Successfully"});

//         } catch(error){
//             console.log("Error In Create user:" , error);
//             res.status(500).json({msg: error.messagr});
//         }
        
//     },
//     read : async function(req , res) {
//         try {
//             const user_data = await User.findOne()
//             res.status(201).json({mssg : error.msg})
//         } catch (error) {
//             console.log(error.msg)
//             res.status(504).json ({msg :error.msg}) 
//         }
        
//     },
//      delete: async function (req, res) {
//         try {
//             const userId = req.params.id;
//             await User.findByIdAndDelete(userId);
//             res.json({ m: "User deleted successfully" });
//         } catch (error) {
//             res.status(500).json({ m: error.message });
//         }
//     },
//     update: async function (req, res) {
//         try {
//             const userId = req.params.id;
//             const { name, email, passw, age } = req.body;

//             const updatedData = {
//                 name,
//                 email,
//                 age,
//             };

//             if (passw) {
//                 updatedData.password = crypt.hashSync(passw, 15);
//             }

//             const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//                 new: true,
//             });

//             if (!updatedUser) {
//                 return res.status(404).json({ msg: "User not found" });
//             }

//             res.json({ msg: "User updated successfully", user: updatedUser });
//         } catch (error) {
//             res.status(500).json({ msg: error.message });
//         }
//     },

// }
// module.exports = Crud



const User = require("../Collection/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login successful!" });
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

      const hashed_pass = bcrypt.hashSync(passw, 15);

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

