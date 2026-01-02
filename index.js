require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { holdingModel } = require("./model/holdingsModel");
const { positionModel } = require("./model/PositionsModel");
const { orderModel } = require("./model/ordersModel");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://frontend5-kappa.vercel.app",
    "https://dashboard-swart-alpha-72.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 REQUIRED FOR VERCEL

/* -------------------- ROUTES -------------------- */
app.use("/auth", authRoute);

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await holdingModel.find({});
    res.status(200).json(allHoldings);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await positionModel.find({});
    res.status(200).json(allPositions);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new orderModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

/* -------------------- DB + SERVER -------------------- */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ DB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
