const multer = require('multer');
const sharp = require('sharp');
const Supplier = require('../models/posts/supplierModel');
const ContactInfo = require('../models/posts/contactInfoModel');
const CompanyAttachments = require('../models/posts/attachmentsModel');
const Statistics = require('../models/posts/statisticsModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
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
  { name: 'gallary_image', maxCount: 1 }
]);
exports.processImages = catchAsyncFunc(async (req, res, next) => {
  if (!req.files) return next();
  // Company logo
  if (req.files.company_logo) {
    req.files.company_logo.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-logo.jpeg`;

    await sharp(req.files.company_logo[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/supplierImages/${req.files.company_logo}`);
  }

  // Gallary images
  if (req.files.gallary_image) {
    req.files.gallary_image.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-gallary.jpeg`;

    await sharp(req.files.gallary_image[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/supplierImages/${req.files.gallary_image.filename}`);
  }

  // Trade License
  if (req.files.trade_licence) {
    const tlfilext = req.files.trade_licence[0].mimetype.split('/')[1];
    req.files.trade_licence.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-tradelisence.${tlfilext}`;
    trade_licenceBuffer = req.files.trade_licence[0].buffer;
    await fs.writeFile(
      `public/img/supplierFiles/${req.files.trade_licence.filename}`,
      trade_licenceBuffer,
      'binary',
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('The trade_licence file was saved!');
        }
      }
    );
  }

  // Company Profile
  if (req.files.company_profile) {
    const cpfilext = req.files.company_profile[0].mimetype.split('/')[1];
    req.files.company_profile.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-profile.${cpfilext}`;
    company_profileBuffer = req.files.company_profile[0].buffer;
    await fs.writeFile(
      `public/img/supplierFiles/${req.files.company_profile.filename}`,
      company_profileBuffer,
      'binary',
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('The company_profile file was saved!');
        }
      }
    );
  }

  // Trade License
  if (req.files.company_catalogue) {
    const ccfilext = req.files.company_catalogue[0].mimetype.split('/')[1];
    req.files.company_catalogue.filename = `tax-${removeSpace(
      req.body.trade_name
    )}-${Date.now()}-catalogue.${ccfilext}`;
    company_catalogueBuffer = req.files.company_profile[0].buffer;
    await fs.writeFile(
      `public/img/supplierFiles/${req.files.company_catalogue.filename}`,
      company_catalogueBuffer,
      'binary',
      function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('The company_catalogue file was saved!');
        }
      }
    );
  }

  next();
});

exports.createSupplier = catchAsyncFunc(async (req, res) => {
  req.body.company_attachments = {
    company_logo: req.files.company_logo.filename,
    trade_licence: req.files.trade_licence.filename,
    company_profile: req.files.company_profile.filename,
    company_catalogue: req.files.company_catalogue.filename,
    gallary_image: req.files.gallary_image.filename
  };
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

  res.status(201).send({
    _id: taxonomy._id
  });
});

exports.getSpecifiers = factory.getAll(Supplier);

exports.getSupplier = factory.getOne(Supplier);

exports.updateSupplier = catchAsyncFunc(async (req, res, next) => {
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
  const attachment = await CompanyAttachments.findByIdAndUpdate(
    req.body.company_attachments._id,
    req.body.company_attachments,
    {
      new: true,
      runValidators: true
    }
  );
  if (!attachment) {
    return next(new AppError('There is no attatchment with that id', 404));
  }
  const stats = await Statistics.findByIdAndUpdate(
    req.body.company_statistics._id,
    req.body.company_statistics,
    {
      new: true,
      runValidators: true
    }
  );
  if (!stats) {
    return next(new AppError('There is no stats with that id', 404));
  }
  const taxonomy = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!supplier) {
    return next(new AppError('There is no supplier with that id', 404));
  }

  res.status(200).send({
    status: 'Success',
    data: {
      supplier
    }
  });
});

exports.deleteSupplier = factory.deleteOne(Supplier);
