// Load env variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

// Model
const Animal = require("./models/Animal");

const app = express();

// ----- Config -----
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// ----- DB Connect -----
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// ----- Middleware -----
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // parse form bodies
app.use(methodOverride("_method")); // enables PUT/DELETE via ?_method=
app.use(morgan("dev"));

// Test route
app.get("/test", (_req, res) => res.send("Server is working!"));

// Redirect root -> animals
app.get("/", (_req, res) => res.redirect("/animals"));

// -------------------- RESTful Routes for /animals --------------------

// Index: GET /animals
app.get("/animals", async (_req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 });
    res.render("animals/index", { animals });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// New: GET /animals/new
app.get("/animals/new", (_req, res) => {
  res.render("animals/new");
});

// Create: POST /animals
app.post("/animals", async (req, res) => {
  try {
    req.body.isEndangered = !!req.body.isEndangered; // checkbox -> boolean
    await Animal.create(req.body);
    res.redirect("/animals");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Show: GET /animals/:id
app.get("/animals/:id", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).send("Animal not found");
    res.render("animals/show", { animal });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Edit: GET /animals/:id/edit
app.get("/animals/:id/edit", async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).send("Animal not found");
    res.render("animals/edit", { animal });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update: PUT /animals/:id
app.put("/animals/:id", async (req, res) => {
  try {
    req.body.isEndangered = !!req.body.isEndangered;
    await Animal.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true
    });
    res.redirect(`/animals/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Destroy: DELETE /animals/:id
app.delete("/animals/:id", async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect("/animals");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// 404
app.use((_req, res) => res.status(404).send("Not Found"));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
