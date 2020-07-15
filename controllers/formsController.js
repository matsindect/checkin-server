const multer = require('multer');
const sharp = require('sharp');
const postMedia = require('../models/posts/mediaModel');
const FormModel = require('../models/formModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

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
  { name: 'single_image', maxCount: 1 },
  { name: 'gallary_images', maxCount: 10 }
]);
exports.processImages = catchAsyncFunc(async (req, res, next) => {
  if (!req.files.single_image || !req.files.gallary_images) return next();

  req.body.media = {};
  // Company logo
  if (req.files.single_image) {
    req.body.media.single_image = `listing-${Date.now()}-single-image.jpeg`;

    await sharp(req.files.single_image[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/listings/${req.body.single_image}`);
  }

  // Gallary images
  req.files.gallary_images = [];

  if (req.files.gallary_images) {
    await Promise.all(
      req.files.gallary_images.map(async (file, i) => {
        const filename = `listing-${i}-${Date.now()}-gallary-image.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/listings/${filename}`);

        req.body.media.gallary_images.push(filename);
      })
    );
  }

  next();
});

// exports.getListings = factory.getAll(FormModel);

exports.getListings = catchAsyncFunc(async (req, res, next) => {
  let doc = await FormModel.find({ cp_slug: req.params.listings });

  if (!doc) {
    return next(new AppError('There is no post type with that slug', 404));
  }
  res.status(200).send({
    status: 'Success',
    data: {
      doc
    }
  });
});

exports.getSingleListing = catchAsyncFunc(async (req, res, next) => {
  let doc = await FormModel.find({
    cp_slug: req.params.listingtype,
    _id: req.params.id
  });

  if (!doc) {
    return next(new AppError('There is no post type with that slug', 404));
  }
  res.status(200).send({
    status: 'Success',
    data: {
      doc
    }
  });
});

exports.createListing = catchAsyncFunc(async (req, res) => {
  // if (req.body.media) {
  const attachment = await postMedia.create(req.body.media);
  // }

  const taxonomy = new FormModel({
    cp_slug: req.params.listingtype,
    cp_data: req.body.post_typeId,
    title: req.body.title,
    form_data: req.body.form_data
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
