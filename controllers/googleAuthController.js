const { OAuth2Client } = require('google-auth-library');
const catchAsyncFunc = require('./../utils/catchAsyncFuncs');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const axios = require('axios');
const sendEmail = require('../utils/emailHandler');
var googleVerify = process.env.GOOGLE_VERIFY; // Your Auth Token from www.twilio.com/console

const signtoken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const handshakeToken = (user, statusCode, res) => {
  const token = signtoken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  user.user_password = undefined;
  // res.cookie('sessionid', token, cookieOptions);
  res.status(statusCode).send({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

//@route    GET api/v1/users/google-signin
//@desc     Signin using google API
//@access   Public
exports.googleAuth = catchAsyncFunc(async (req, res, next) => {
  const {data}= await axios.get(`${googleVerify}${req.body.token}`);
  console.log(data)
  // If request specified a G Suite domain:
  // const domain = data['hd'];
  if (data) {
    const googleUser = {
      user_name: data.given_name,
      application_id: data.sub,
      user_email_address: data.email,
      email_verified:data.email_verified,
    };
    const user = await User.findOne({ user_email_address: data.email,  is_active: { $ne: false }  });

    if (user !== null && user !== undefined) {

        user.email_verified = data.email_verified;
        
        if(data.email_verified === false){
            const resetToken = user.creatUserResetToken();
            const resetUrl = `${req.protocol}://${req.get(
                        'host'
                    )}/api/v1/users/verify-email${resetToken}`;

                    const message = `Forgot your password? Submit a patch request ursing the link provided and confirm password using:${resetUrl}`;
                    const mailOptions = {
                        from: 'DCC Seventh Day Adventist <contact@dubaiadventist.org>',
                        to: data.email,
                        subject: "Verify your email",
                        text: message
                      };
                    sendEmail(mailOptions)
        }
        user.save();
        handshakeToken(user, 200, res);
    } else {
     console.log(googleUser)
      const newUser = await User.create(googleUser);
     
      handshakeToken(newUser, 201, res);
    }
  } else {
    next(new AppError('Could not verify your user token', 401));
  }
});
