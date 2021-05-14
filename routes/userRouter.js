const express = require("express");
const router = express.Router();
const { googleLogin, facebookLogin } = require("../controllers/userController");

router.route("/google").post(googleLogin);
router.route("/facebook").post(facebookLogin);

module.exports = router;
