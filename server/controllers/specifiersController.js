const Specifier = require('../models/posts/specifierModel');
const ContactInfo = require('../models/posts/contactInfoModel');
const CompanyAttachments = require('../models/posts/attachmentsModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');

/////////////////////////////   SPECIFIER  ///////////////////////////////////

exports.createSpecifier = catchAsyncFunc(async (req, res) => {
  const contact = await ContactInfo.create(req.body.contact_info);

  const taxonomy = new Specifier(req.body);
  taxonomy.contact_info = contact._id;
  await taxonomy.save();

  res.status(201).send({ _id: taxonomy._id });
});

exports.getSpecifiers = factory.getAll(Specifier);

exports.getSpecifier = factory.getOne(Specifier, { path: 'contacts' });

exports.updateSpecifier = factory.updateOne(Specifier);

exports.deleteSpecifier = factory.deleteOne(Specifier);
