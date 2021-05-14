const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/UserModel");
const generateToken = require("../util/generateToken");
const axios = require("axios");

const client = new OAuth2Client(process.env.CLIENT_ID);

// @desc  Authenticate the users using facebook
// @route  POST /api/auth/facebook
// @access Public
const facebookLogin = asyncHandler(async (req, res) => {
  const { userID, accessToken } = req.body;
  // console.log(userID, accessToken);

  let urlGraphFacebook = `https://graph.facebook.com/${userID}?fields=name,email,picture&access_token=${accessToken}`;
  const { data } = await axios.get(urlGraphFacebook);
  const { name, email, picture } = data;

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
      name: name,
      email: email,
      picture: picture.data.url,
    });

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Could not create!" });
    }
  }

  // console.log(name, email, picture);
});

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
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Could not create!" });
    }
  }
});

module.exports = { facebookLogin, googleLogin };
