require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {holdingModel} = require("./model/holdingsModel.js");
const {positionModel} = require("./model/PositionsModel.js");
const {orderModel} = require("./model/ordersModel.js");
const authRoute = require("./Routes/AuthRoute");

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;

const app = express();
app.use(cors({
   origin: ["https://dashboard-swart-alpha-72.vercel.app", "https://frontend-omega-lovat-96.vercel.app", "http://localhost:3000", "http://localhost:3001" ],
   credentials: true,
 }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);

app.get("/allHoldings", async(req, res) => {
   let allHoldings = await holdingModel.find({});
   res.json(allHoldings);
});

app.get("/allPositions", async(req, res) => {
   let allPositions = await positionModel.find({});
   res.json(allPositions);
});

app.post("/newOrder", async(req, res) => {
   let newOrder = new orderModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
   })
   newOrder.save();
})







 app.listen(PORT, () => {
    console.log("app started!");
    mongoose.connect(url);
    console.log("DB connected!");
 });
