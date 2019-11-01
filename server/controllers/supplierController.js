const multer = require('multer');
const sharp = require('sharp');
const Supplier = require('./../models/posts/supplierModel');
const ContactInfo = require('./../models/posts/contactInfoModel');
const CompanyAttachments = require('./../models/posts/attachmentsModel');
const Statistics = require('./../models/posts/statisticsModel');
const catchAsyncFunc = require('./../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const fs = require('fs');

/////////////////////////////   SUPPLIER  ///////////////////////////////////
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

exports.uploadSupplierImages = upload.fields([
  { name: 'company_logo', maxCount: 1 },
  { name: 'trade_licence', maxCount: 1 },
  { name: 'company_profile', maxCount: 1 },
  { name: 'company_catalogue', maxCount: 1 },
  { name: 'gallary_image', maxCount: 3 }
]);
exports.processImages = catchAsyncFunc(async (req, res, next) => {
  // Company logo
  req.files.company_logo.filename = `tax-${removeSpace(
    req.body.trade_name
  )}-${Date.now()}-logo.jpeg`;

  await sharp(req.files.company_logo[0].buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/supplierImages/${req.files.company_logo}`);

  // Gallary images
  req.files.gallary_image.filename = `tax-${removeSpace(
    req.body.trade_name
  )}-${Date.now()}-gallary.jpeg`;

  await sharp(req.files.gallary_image[0].buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/supplierImages/${req.files.gallary_image.filename}`);

  // Trade License
  const tlfilext = req.files.trade_licence[0].mimetype.split('/')[1];
  req.files.trade_licence.filename = `tax-${removeSpace(
    req.body.trade_name
  )}-${Date.now()}-tradelisence.${tlfilext}`;
  trade_licenceBuffer = req.files.trade_licence[0].buffer;
  await fs.writeFile(
    `public/img/supplierFiles/${req.files.trade_licence.filename}`,
    trade_licenceBuffer,
    'binary',
    function(er) {
      if (err) {
        console.log(err);
      } else {
        console.log('The trade_licence file was saved!');
      }
    }
  );

  // Company Profile
  const cpfilext = req.files.company_profile[0].mimetype.split('/')[1];
  req.files.company_profile.filename = `tax-${removeSpace(
    req.body.trade_name
  )}-${Date.now()}-profile.${cpfilext}`;
  company_profileBuffer = req.files.company_profile[0].buffer;
  await fs.writeFile(
    `public/img/supplierFiles/${req.files.company_profile.filename}`,
    company_profileBuffer,
    'binary',
    function(er) {
      if (err) {
        console.log(err);
      } else {
        console.log('The company_profile file was saved!');
      }
    }
  );

  // Trade License
  const ccfilext = req.files.company_catalogue[0].mimetype.split('/')[1];
  req.files.company_catalogue.filename = `tax-${removeSpace(
    req.body.trade_name
  )}-${Date.now()}-catalogue.${ccfilext}`;
  company_catalogueBuffer = req.files.company_profile[0].buffer;
  await fs.writeFile(
    `public/img/supplierFiles/${req.files.company_catalogue.filename}`,
    company_catalogueBuffer,
    'binary',
    function(er) {
      if (err) {
        console.log(err);
      } else {
        console.log('The company_catalogue file was saved!');
      }
    }
  );
  req.body.company_attachments = {
    company_logo: req.files.company_logo.filename,
    trade_licence: req.files.trade_licence.filename,
    company_catalogue: req.files.company_catalogue.filename,
    company_profile: req.files.company_profile.filename,
    gallary_image: req.files.gallary_image.filename
  };

  console.log(req.body.company_attachments);
  next();
});

exports.createSupplier = catchAsyncFunc(async (req, res) => {
  console.log(req.files);
  const contact = await ContactInfo.create(req.body.contact_info);
  const attachment = await CompanyAttachments.create(
    req.body.company_attachments
  );
  const stats = await Statistics.create(req.body.company_statistics);

  const taxonomy = new Supplier(req.body);
  if (contact) taxonomy.contact_info = contact._id;
  if (attachment) taxonomy.company_attachments = attachment._id;
  if (stats) taxonomy.company_statistics = stats._id;

  await taxonomy.save();

  res.status(201).send({ _id: taxonomy._id });
});

exports.getSpecifiers = factory.getAll(Supplier);

exports.getSupplier = factory.getOne(Supplier);

exports.updateSupplier = factory.updateOne(Supplier);

exports.deleteSupplier = factory.deleteOne(Supplier);
