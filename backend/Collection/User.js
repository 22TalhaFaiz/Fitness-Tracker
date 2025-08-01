// const mongo = require("mongoose")

// const  user_structure = mongo.Schema({
//     name : {
//         type :String,
//         require: true,
//     },

//     email :{
//         type :String,
//         require: true,
//     },
//     password:{
//         type:String,
//         require:true,
//     },
//     age:{
//         type:String,
//         require:true,
//     }

// })
// module.exports = mongo.model("users", user_structure)


const mongoose = require("mongoose");

const user_structure = new mongoose.Schema({
  name: {
    type: String,
    required: true, // spelling corrected
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", user_structure);
