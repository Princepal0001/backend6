require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {                   // creating and returning a token
    expiresIn: 3 * 24 * 60 * 60,                                      // expires in 3 days
  });
};