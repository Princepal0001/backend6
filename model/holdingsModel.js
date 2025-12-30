const  mongoose = require("mongoose");

// const {model} = require("mongoose");

const {holdingSchema} = require("../schemas/holdingsSchema");

const holdingModel = new mongoose.model("holding", holdingSchema);

module.exports = {holdingModel};