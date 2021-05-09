const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/UserModel");
const generateToken = require("../util/generateToken");

const client = new OAuth2Client(process.env.CLIENT_ID);

// @desc  Authenticate the users using google
// @route  POST /api/auth/google
// @access Public
const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  // find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    const { _id, name, email, picture } = userExists;
    res.status(201).json({
      name: name,
      email: email,
      picture: picture,
      token: generateToken(_id),
    });
  } else {
    // create user if doesn't exist
    const user = await User.create({
      name,
      email,
      picture,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(_id),
      });
    } else {
      res.status(400).json({ error: "Could not create!" });
    }
  }
});

module.exports = { googleLogin };
