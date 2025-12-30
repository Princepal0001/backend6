const  mongoose = require("mongoose");
// const {Schema} = require("mongoose");

const holdingSchema = new mongoose.Schema({
    name : String, 
    qty: Number,
    avg: Number, 
    price: Number, 
    net: String, 
    day: String,
});

module.exports = {holdingSchema};