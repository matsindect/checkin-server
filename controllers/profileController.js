const Profile = require('../models/profileModel');
const APIresourceFunc = require('../utils/APIresourceFunc');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');

//@route    Get api/v1/profile/
//@desc     Get user profile
//@access   Public
exports.getProfile = catchAsyncFunc(async (req, res, next) => {
  let query = Profile.findOne({ user: req.user.id }).populate('user', [
    'name',
    'avatar'
  ]);
  const doc = await query;
  if (!doc) {
    return next(new AppError('User not registered', 404));
  }
  res.status(200).send({
    status: 'Success',
    data: {
      doc
    }
  });
});

//@route    Post api/v1/profile/handle
//@desc     Get profile by handle
//@access   Public

exports.getProfileByHandle = catchAsyncFunc(async (req, res, next) => {
  let query = Profile.findOne({ handle: req.param.handle }).populate('user', [
    'name',
    'avatar'
  ]);
  const doc = await query;
  if (!doc) {
    return next(new AppError('User not registered', 404));
  }
  res.status(200).send({
    status: 'Success',
    data: {
      doc
    }
  });
});

//@route    Post api/v1/profile/
//@desc     Get profile by handle
//@access   Public

exports.getAllProfiles = factory.getAll(Profile);

//@route    Post api/v1/profile/
//@desc     Create current user profile
//@access   Private

exports.createProfile = catchAsyncFunc(async (req, res, next) => {
  //Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }

  //social
  profileFields.social = {};
  if (req.body.youtube) profileFields.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.instagram = req.body.instagram;

  let profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    //Update
    let doc = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    res.status(200).send({
      status: 'Success',
      data: {
        doc
      }
    });
  } else {
    //Create
    // Check the handle
    let profile = await Profile.findOne({ handle: profileFields.handle });
    if (profile) {
      return next(new AppError('Profile hndle already taken', 400));
    }

    //save Profile
    const doc = new Profile(profileFields);
    await doc.save();

    res.status(200).send({
      status: 'Success',
      data: {
        doc
      }
    });
  }
});

//@route    Post api/v1/profile/expeience
//@desc     Add experience current user profile
//@access   Public

exports.createExperience = catchAsyncFunc(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });
  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  // Adding the experience
  profile.experience.unshift(newExp);
  await profile.save();

  res.status(200).send({
    status: 'Success',
    data: {
      profile
    }
  });
});

//@route    Post api/v1/profile/education
//@desc     Add education current user profile
//@access   Public

exports.createEducation = catchAsyncFunc(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  // Adding the experience
  profile.education.unshift(newEdu);
  await profile.save();

  res.status(200).send({
    status: 'Success',
    data: {
      profile
    }
  });
});

//@route    Post api/v1/profile/ecperience/:id
//@desc     Delete experience from current user profile
//@access   Private

exports.deleteExprience = catchAsyncFunc(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return next(new AppError('profile does not exist', 404));
  }
  // Delete the experience
  const removeIndex = profile.experience
    .map(exp => exp.id)
    .indexOf(req.params.exp_id);
  //splice out of array
  profile.experience.splice(removeIndex, 1);
  //save
  await profile.save();
  res.status(200).send({
    status: 'Success',
    data: {
      profile
    }
  });
});

//@route    Post api/v1/profile/education/:edu_id
//@desc     Delete Education from current user profile
//@access   Private

exports.deleteEducation = catchAsyncFunc(async (req, res, next) => {
  let profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return next(new AppError('profile does not exist', 404));
  }
  // Delete the education
  const removeIndex = profile.education
    .map(edu => edu.id)
    .indexOf(req.params.edu_id);
  //splice out of array
  profile.education.splice(removeIndex, 1);
  //save
  await profile.save();
  res.status(200).send({
    status: 'Success',
    data: {
      profile
    }
  });
});

//@route    Delete api/v1/profile/
//@desc     Delete user and profile
//@access   Private

exports.deleteProfile = catchAsyncFunc(async (req, res, next) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findByIdAndRemove({ _id: req.user.id });
  res.json({ success: true });
});
