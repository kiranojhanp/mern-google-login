const express = require("express");
const router = express.Router();
const { googleLogin, facebookLogin, resetPassword } = require("../controllers/userController");

router.route("/google").post(googleLogin);
router.route("/facebook").post(facebookLogin);

router.route("/reset").post(resetPassword);

module.exports = router;
