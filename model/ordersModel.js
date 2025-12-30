const {model} = require("mongoose");

const {orderSchema} = require("../schemas/ordersSchema.js");

const orderModel = new model("order", orderSchema);

module.exports = {orderModel};


