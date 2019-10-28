const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsyncFunc = require('./../utils/catchAsyncFuncs');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/emailHandler');

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
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).send({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsyncFunc(async (req, res, next) => {
  const newUser = await User.create(req.body);
  handshakeToken(newUser, 201, res);
});

exports.login = catchAsyncFunc(async (req, res, next) => {
  const { user_email_address, user_password } = req.body;

  if (!user_email_address || !user_password) {
    next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ user_email_address }).select(
    '+user_password'
  );

  if (
    !user ||
    !(await user.comparePassword(user_password, user.user_password))
  ) {
    return next(new AppError('Incorrect Password or Email', 401));
  }

  handshakeToken(user, 200, res);
});

exports.protect = catchAsyncFunc(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in, Please login to get access', 401)
    );
  }

  const decodedtoken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // Check if user still exist
  const currentUser = await User.findById(decodedtoken.id);
  if (!currentUser) {
    return new AppError(
      'User no longer exists, Please signup and get new token',
      401
    );
  }

  if (currentUser.passwordChanged(decodedtoken.iat)) {
    return new AppError('Password chande, Please login aagain', 401);
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return new AppError('You are not allowed to perform this action', 403);
    }
    next();
  };
};

exports.fogortPassword = catchAsyncFunc(async (req, res, next) => {
  const user = await User.findOne({
    user_email_address: req.body.user_email_address
  });
  if (!user) {
    return next(new AppError('User email address not found', 404));
  }

  const resetToken = user.creatUserResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a patch request ursing the link provided and confirm password using:${resetUrl}`;

  try {
    await sendEmail({
      email: req.body.user_email_address,
      subject: 'You have only 10min to use reset link',
      message
    });

    res.status(200).json({
      success: 'success',
      message: 'Token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending email', 500));
  }
});
exports.resetPassword = catchAsyncFunc(async (req, res, next) => {
  // Get user by token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token has expired or is invalid', 401));
  }

  user.user_password = req.body.user_password;
  user.user_Confirmpassword = req.body.user_Confirmpassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  handshakeToken(user, 201, res);
});

exports.updatePassword = catchAsyncFunc(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+user_password');

  if (
    !(await user.comparePassword(
      req.body.user_Currentpassword,
      user.user_password
    ))
  ) {
    return next(new AppError('Your current password is wrong', 401));
  }

  user.user_password = req.body.user_password;
  user.user_Confirmpassword = req.body.user_Confirmpassword;

  await user.save();

  handshakeToken(user, 201, res);
});
