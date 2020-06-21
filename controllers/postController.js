const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/posts/postModel');
const postMedia = require('../models/posts/mediaModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const fs = require('fs');

/////////////////////////////   Post  ///////////////////////////////////
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('application')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('text')) {
    cb(null, true);
  } else {
    cb(new AppError('File not allowed', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const removeSpace = item => {
  return item.replace(/\s/g, '-');
};

exports.uploadPostImages = upload.fields([
  { name: 'featured_image', maxCount: 1 }
]);
exports.processImages = catchAsyncFunc(async (req, res, next) => {
  if (!req.files) return next();
  // Company logo
  if (req.files.featured_image) {
    req.files.featured_image.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-image.jpeg`;

    await sharp(req.files.featured_image[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/postImages/${req.files.featured_image}`);
  }
  next();
});

exports.createPost = catchAsyncFunc(async (req, res) => {
  req.body.media = {
    featured_image: req.files.featured_image.filename
  };

  const attachment = await postMedia.create(req.body.media);

  const taxonomy = new Post({
    title: req.body.title,
    desrciption: req.body.desrciption,
    categories: req.categories.id,
    avatar: req.body.avatar,
    user: req.user.id
  });
  if (attachment) taxonomy.media = attachment._id;

  await taxonomy.save();

  res.status(201).send({
    status: 'success',
    data: {
      doc: taxonomy
    }
  });
});

exports.getPost = factory.getOne(Post);

exports.updatePost = catchAsyncFunc(async (req, res, next) => {
  if (req.body.media) {
    const attachment = await postMedia.findByIdAndUpdate(
      req.body.media._id,
      {
        $set: {
          featured_image:
            req.files.featured_image.filename || req.body.featured_image
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!attachment) {
      return next(new AppError('There is no attatchment with that id', 404));
    }
  } else if (req.body.media == null) {
    if (req.files) {
      req.body.media = {
        featured_image:
          req.files.featured_image.filename || req.body.featured_image
      };
    }
    const attachment = await postMedia.create(req.body.media);

    if (attachment) req.body.media = attachment;
  }

  const Post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!Post) {
    return next(new AppError('There is no Post with that id', 404));
  }

  res.status(200).send({
    status: 'Success',
    data: {
      Post
    }
  });
});

exports.deletePost = factory.deleteOne(Post);
