const asyncHandler = require("express-async-handler");
const axios = require("axios");

// use googleapis to exchange refresh token for access token dynamically and use nodemailer to send email
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// for validating accessToken
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/UserModel");
const generateToken = require("../util/generateToken");

const client = new OAuth2Client(process.env.CLIENT_ID);

// @desc  Authenticate the users using facebook
// @route  POST /api/auth/facebook
// @access Public
const facebookLogin = asyncHandler(async (req, res) => {
  const { userID, accessToken } = req.body;

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

// @desc  Send password reset email to user
// @route  POST /api/auth/reset
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { emailTo } = req.body;
  const oAuth2Client = new google.auth.OAuth2(
    process.env.MAILER_CLIENT_ID,
    process.env.MAILER_CLIENT_SECRET,
    process.env.MAILER_REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "kiranojha1226@gmail.com",
      clientId: process.env.MAILER_CLIENT_ID,
      clientSecret: process.env.MAILER_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: "Timro Buda😇 <kiranojha1226@gmail.com>",
    to: emailTo,
    subject: "Eh sexy timi kati ramri",
    text: "I love you budi",
  };

  const result = await transport.sendMail(mailOptions);

  res.json({ message: "Email is sent", result });
});

module.exports = { facebookLogin, googleLogin, resetPassword };
