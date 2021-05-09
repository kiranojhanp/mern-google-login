const express = require("express");
const router = express.Router();
const { googleLogin } = require("../controllers/userController");

router.route("/google").post(googleLogin);

module.exports = router;
