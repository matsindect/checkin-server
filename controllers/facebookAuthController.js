const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/emailHandler');
const axios = require('axios');
var facebookVerify = process.env.FACEBOOK_VERIFY; // Your Account SID from www.twilio.com/console

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


//@route    GET api/v1/users/facebook-signin
//@desc     Signin using facebook API
//@access   Public
exports.facebookAuth = catchAsyncFunc(async (req, res, next) => {
  const userFieldSet = 'id,email,name,is_verified';

  const {data } = await axios.get(`${facebookVerify}${req.body.user_id}?fields=${userFieldSet}&access_token=${req.body.token}`);
  // console.log(data)
  if (data) {
    var code = Math.floor(1000 + Math.random() * 9000);
    let user;
    if(data.email === null ||  data.email === undefined || data.email === ""){
      user = await User.findOne({ application_id: data.id,  is_active: { $ne: false }  });
      
    }else{
      user = await User.findOne({ user_email_address: data.email,  is_active: { $ne: false }  });
    }
    
    const facebookUser = {
      user_name: data.name,
      application_id: data.id,
      user_email_address: data.email,
      email_verified:data.is_verified,
    };
    if (user != null && user != undefined) {
      user.email_verified = data.is_verified;
      if(data.email_verified === false){
        const resetToken = user.creatUserResetToken();
        const resetUrl = `${req.protocol}://${req.get(
                    'host'
                )}/api/v1/users/reset-password/${resetToken}`;

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
      const newUser = await User.create(facebookUser);
      handshakeToken(newUser, 201, res);
    }
  } else {
    next(new AppError('Could not verify your token', 401));
  }
});
