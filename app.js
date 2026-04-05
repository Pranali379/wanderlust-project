require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ------------------ PORT ------------------
const PORT = process.env.PORT || 3000;

// ------------------ DB URL ------------------
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// ------------------ DB CONNECTION ------------------
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

// ------------------ ROUTES ------------------
app.get("/", (req, res) => {
    res.redirect("/listings");
});
// ------------------ SERVER ------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});