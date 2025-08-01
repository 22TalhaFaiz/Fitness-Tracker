// require("dotenv").config()
// const exp = require("express")
// const db = require("./Connection")
// const cors = require("cors")
// const router = require("./Routes/route")

// const app = exp();

// app.use(cors());
// app.use(exp.json());
// app.use("/", router);

// db().then(()=>{
//     app.listen(3008,()=>{
//         console.log("Server Started at http://localhost:3008")
//     })

// }).catch((e)=>{
//     console.log(e)
// })

require("dotenv").config();
const express = require("express");
const db = require("./Connection");
const cors = require("cors");
const router = require("./Routes/route");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", router); // So login => /api/auth/login

db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server started at http://localhost:${process.env.PORT}`);
  });
});
