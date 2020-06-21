const multer = require('multer');
const sharp = require('sharp');
const CustomPost = require('../models/customPostModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  //  console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('File not an image', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadIcon = upload.single('icon');

const removeSpace = item => {
  return item.replace(/\s/g, '-');
};
exports.resizeIcon = catchAsyncFunc(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `tax-${removeSpace(req.body.label)}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/customPost/${req.file.filename}`);

  next();
});
//@route    POST /api/v1/custom
//@desc     Create custom post type
//@access   Public
exports.createCustomPost = factory.createOne(CustomPost);

//@route    GET /api/v1/custom
//@desc     Get all custom post types
//@access   Public

exports.getCustomPosts = factory.getAll(CustomPost);

//@route    GET /api/v1/custom
//@desc     Get custom post type
//@access   Public

exports.getCustomPost = factory.getOne(CustomPost);

//@route    PUT /api/v1/custom
//@desc     Update custom post type
//@access   Public

exports.updateCustomPost = factory.updateOne(CustomPost);

//@route    DELETE /api/v1/custom
//@desc     Delete custom post type
//@access   Public

exports.deleteCustomPost = factory.deleteOne(CustomPost);

//@route    Post /api/v1/custom/field
//@desc     Create custom post type
//@access   Public

exports.createFields = catchAsyncFunc(async (req, res, next) => {
  // search customPostModel for _id
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  const newFields = {
    field_label: req.body.field_label,
    name: req.body.name,
    placeholder: req.body.placeholder,
    description: req.body.description,
    field_type: req.body.field_type
  };
  if (typeof req.body.custom_class !== 'undefined') {
    newFields.custom_class = req.body.custom_class.split(',');
  }
  // Adding the fields
  custompost.fields.unshift(newFields);
  await custompost.save();

  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    POST /api/v1/custom/cover
//@desc     Create custom post type
//@access   Public

exports.createCoverDetails = catchAsyncFunc(async (req, res, next) => {
  // search customPostModel for _id
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  const newFields = {};
  if (typeof req.body.cover_fields !== 'undefined') {
    newFields.cover_fields = req.body.cover_fields.split(',');
  }
  if (typeof req.body.call_to_action !== 'undefined') {
    newFields.call_to_action = req.body.call_to_action.split(',');
  }
  // Adding the cover_details
  custompost.cover_detail.unshift(newFields);
  await custompost.save();

  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    POST /api/v1/custom/tab
//@desc     create custom post type
//@access   Public

exports.createCoverTab = catchAsyncFunc(async (req, res, next) => {
  // search customPostModel for _id
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  const newFields = {
    labels: req.body.labels,
    permalink: req.body.permalink,
    layout: req.body.layout
  };
  // Adding the custom_tabs
  custompost.cover_tabs.unshift(newFields);
  await custompost.save();

  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    POST /api/v1/custom/preview
//@desc     Create custom post type
//@access   Public

exports.createPostPreview = catchAsyncFunc(async (req, res, next) => {
  // search customPostModel for _id
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  const newFields = {
    design: req.body.design
  };
  if (typeof req.body.header_fields !== 'undefined') {
    newFields.header_fields = req.body.header_fields.split(',');
  }
  if (typeof req.body.body_fields !== 'undefined') {
    newFields.body_fields = req.body.body_fields.split(',');
  }
  if (typeof req.body.footer_fields !== 'undefined') {
    newFields.footer_fields = req.body.footer_fields.split(',');
  }
  // Adding the post_preview
  custompost.post_preview.unshift(newFields);
  await custompost.save();

  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    UPDATE /api/v1/custom/field/:id
//@desc     Update field from current post type
//@access   Private

exports.updateFields = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Replacement
  if (typeof req.body.custom_class !== 'undefined') {
    var newcustom_class = req.body.custom_class.split(',');
  }
  const newFields = {
    _id: req.body._id,
    field_label: req.body.field_label,
    name: req.body.name,
    placeholder: req.body.placeholder,
    description: req.body.description,
    field_type: req.body.field_type,
    custom_class: newcustom_class
  };

  // console.log(newFields);
  // return new field.
  let removeIndex = custompost.fields.map(exp => exp._id).indexOf(req.body._id);

  if (removeIndex !== -1) {
    custompost.fields[removeIndex] = newFields;
  }

  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    UPDATE /api/v1/custom/cover/:fd_id
//@desc     Update Cover field from current post type
//@access   Private

exports.updateCoverDetails = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Replacement
  const newFields = {
    _id: req.params.fd_id
  };
  if (typeof req.body.cover_fields !== 'undefined') {
    newFields.cover_fields = req.body.cover_fields.split(',');
  }
  if (typeof req.body.call_to_action !== 'undefined') {
    newFields.call_to_action = req.body.call_to_action.split(',');
  }

  // return new cover fields.
  let removeIndex = custompost.cover_detail
    .map(exp => exp._id)
    .indexOf(req.body._id);

  if (removeIndex !== -1) {
    custompost.fields[removeIndex] = newFields;
  }

  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    UPDATE /api/v1/custom/tab/:fd_id
//@desc     Update Cover field from current post type
//@access   Private

exports.updateCoverTab = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Replacement
  const newFields = [
    {
      _id: req.params.fd_id,
      labels: req.body.labels,
      permalink: req.body.permalink,
      layout: req.body.layout
    }
  ];

  // return new field.
  let removeIndex = custompost.cover_tabs
    .map(exp => exp._id)
    .indexOf(req.body._id);

  if (removeIndex !== -1) {
    custompost.fields[removeIndex] = newFields;
  }
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    UPDATE /api/v1/custom/preview/:fd_id
//@desc     Update post preview from current post type
//@access   Private
exports.updatePostPreview = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Replacement
  const newFields = [
    {
      _id: req.body._id,
      design: req.body.design
    }
  ];
  if (typeof req.body.header_fields !== 'undefined') {
    newFields.header_fields = req.body.header_fields.split(',');
  }
  if (typeof req.body.body_fields !== 'undefined') {
    newFields.body_fields = req.body.body_fields.split(',');
  }
  if (typeof req.body.footer_fields !== 'undefined') {
    newFields.footer_fields = req.body.footer_fields.split(',');
  }

  // return new field.
  let removeIndex = custompost.post_preview
    .map(exp => exp._id)
    .indexOf(req.body._id);

  if (removeIndex !== -1) {
    custompost.fields[removeIndex] = newFields;
  }
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    DELETE Post /api/v1/custom/field/:fd_id
//@desc     Delete Fields from current user profile
//@access   Private

exports.deleteFields = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Delete the Fields
  const removeIndex = custompost.fields
    .map(exp => exp._id)
    .indexOf(req.body._id);
  //splice out of array
  custompost.fields.splice(removeIndex, 1);
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});

//@route    DELETE Post /api/v1/custom/cover/:fd_id
//@desc     Delete cover_detail from current user profile
//@access   Private

exports.deleteCoverDetails = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Delete the experience
  const removeIndex = custompost.cover_detail
    .map(exp => exp._id)
    .indexOf(req.body._id);
  //splice out of array
  custompost.cover_detail.splice(removeIndex, 1);
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});
//@route    DELETE Post /api/v1/custom/tab/:fd_id
//@desc     Delete cover_tabs from current user profile
//@access   Private

exports.deleteCoverTab = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Delete the experience
  const removeIndex = custompost.cover_tabs
    .map(exp => exp._id)
    .indexOf(req.body._id);
  //splice out of array
  custompost.cover_tabs.splice(removeIndex, 1);
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});
//@route    DELETE Post /api/v1/custom/preview/:fd_id
//@desc     Delete cover_tabs from current user profile
//@access   Private

exports.deletePostPreview = catchAsyncFunc(async (req, res, next) => {
  let custompost = await CustomPost.findOne({ _id: req.params.id });
  if (!custompost) {
    return next(new AppError('custompost does not exist', 404));
  }
  // Delete the experience
  const removeIndex = custompost.post_preview
    .map(exp => exp._id)
    .indexOf(req.body._id);
  //splice out of array
  custompost.post_preview.splice(removeIndex, 1);
  //save
  await custompost.save();
  res.status(200).send({
    status: 'Success',
    data: {
      custompost
    }
  });
});
