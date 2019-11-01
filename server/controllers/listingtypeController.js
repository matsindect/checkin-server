const listingType = require('../models/listingtypeModel');
const listingtypeSettings = require('../models/listingtypeSettingsModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');

exports.createListingType = catchAsyncFunc(async (req, res) => {
  const listingSettings = await listingtypeSettings.create(req.body.settings);

  const listingtype = new listingType(req.body);
  listingtype.settings = listingSettings._id;
  await listingtype.save();

  res.status(201).send({ _id: listingtype._id });
});

exports.getListingTypes = factory.getAll(listingType);

exports.getListingType = factory.getOne(listingType);

exports.updateListingType = factory.updateOne(listingType);

exports.deleteListingType = factory.deleteOne(listingType);
