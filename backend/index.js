require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors"); // 👈 before session
const db = require("./Connection");

const app = express();

// ✅ Move CORS middleware to the top
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Now the rest
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path:"/",
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

// ✅ Mount routes
app.use("/api/auth", require("./Routes/route")); 
app.use("/api/workouts", require("./Routes/workoutRoutes"));
app.use("/api/analytics", require("./Routes/analyticsRoutes"));

// ✅ Start server
db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server started at http://localhost:${process.env.PORT}`);
  });
});
