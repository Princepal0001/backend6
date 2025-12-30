const { Signup, Login } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware")
const router = require("express").Router();

router.post("/user", userVerification);
router.post("/register", Signup);
router.post("/login", Login);

module.exports = router;