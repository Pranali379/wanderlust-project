const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session); // your old style

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB (no extra options needed in Mongoose v7+)
mongoose.connect("mongodb://127.0.0.1:27017/yourDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Session setup
app.use(session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: "mongodb://127.0.0.1:27017/yourDB" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Routes
app.get("/", (req, res) => {
    res.send("Session is working!");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "1234") {
        req.session.user = username;
        res.send("Login successful");
    } else {
        res.send("Invalid credentials");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.send("Logged out successfully");
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));