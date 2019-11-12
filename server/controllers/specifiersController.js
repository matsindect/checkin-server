const multer = require('multer');
const sharp = require('sharp');
const Specifier = require('../models/posts/specifierModel');
const ContactInfo = require('../models/posts/contactInfoModel');
const CompanyAttachments = require('../models/posts/attachmentsModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

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
exports.uploadlogo = upload.single('company_logo');

const removeSpace = item => {
  return item.replace(/\s/g, '-');
};
exports.processLogo = catchAsyncFunc(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `sp-${removeSpace(
    req.body.specifier_name
  )}-${Date.now()}-logo.jpeg`;

  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/specImages/${req.file.filename}`);

  next();
});
/////////////////////////////   SPECIFIER  ///////////////////////////////////

exports.createSpecifier = catchAsyncFunc(async (req, res) => {
  if (req.file) req.body.company_attachments.company_logo = req.file.filename;

  const contact = await ContactInfo.create(req.body.contact_info);

  const attachment = await CompanyAttachments.create(
    req.body.company_attachments
  );

  const taxonomy = new Specifier(req.body);

  if (contact) taxonomy.contact_info = contact._id;
  if (attachment) taxonomy.company_attachments = attachment._id;

  await taxonomy.save();

  res.status(201).send({
    status: 'success',
    data: {
      doc: taxonomy
    }
  });
});

exports.getSpecifiers = factory.getAll(Specifier);

exports.getSpecifier = factory.getOne(Specifier, { path: 'contacts' });

exports.updateSpecifier = catchAsyncFunc(async (req, res, next) => {
  const specifierDetails = await Specifier.find({ _id: req.params.id });

  if (req.body.contact_info) {
    const contact = await ContactInfo.findByIdAndUpdate(
      req.body.contact_info._id,
      req.body.contact_info,
      {
        new: true,
        runValidators: true
      }
    );
    if (!contact) {
      return next(new AppError('There is no contacts with that id', 404));
    }
  } else if (req.body.contact_info == null) {
    const info = await ContactInfo.create(req.body.contact_info);

    if (info) req.body.contact_info = info;
  }

  if (req.body.company_attachments) {
    console.log(req.body.company_attachments);
    const attachment = await CompanyAttachments.findByIdAndUpdate(
      req.body.company_attachments._id,
      {
        $set: {
          company_logo: req.file.company_logo.filename || req.body.company_logo
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
  } else if (req.body.company_attachments == null) {
    if (req.file) {
      req.body.company_attachments = { company_logo: req.file.filename };
    }
    const attachment = await CompanyAttachments.create(
      req.body.company_attachments
    );

    if (attachment) req.body.company_attachments = attachment;
  }

  const specifier = await Specifier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!specifier) {
    return next(new AppError('There is no specifier with that id', 404));
  }

  res.status(200).send({
    status: 'Success',
    data: {
      specifier
    }
  });
});

exports.deleteSpecifier = factory.deleteOne(Specifier);
