require("dotenv").config();
const express = require("express");
const session = require("express-session")
const db = require("./Connection");
const cors = require("cors");
const router = require("./Routes/route");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));
app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    }
  })
);

app.use("/api/auth", router); 

db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server started at http://localhost:${process.env.PORT}`);
  });
});
