require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ------------------ MODEL ------------------
const Listing = require("./models/listing"); // make sure this file exists

// ------------------ PORT ------------------
const PORT = process.env.PORT || 3000;

// ------------------ DB URL ------------------
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// ------------------ DB CONNECTION ------------------
mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// ------------------ MIDDLEWARE ------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------ ROUTES ------------------

// Root route → redirect to listings
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Show all listings
app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index", { allListings });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching listings");
    }
});

// ------------------ ERROR HANDLING ------------------

// 404 route
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// ------------------ SERVER ------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});