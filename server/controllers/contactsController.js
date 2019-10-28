const Contacts = require('../models/posts/contactsModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');

/////////////////////////////   CONTACTS  ///////////////////////////////////
exports.setIds = (req, res, next) => {
  if (!req.body.specifier_company)
    req.body.specifier_company = req.params.specifierId;
  if (!req.body.user) req.body.user = req.params.id;
  next();
};
exports.createContacts = factory.createOne(Contacts);

exports.getContacts = factory.getAll(Contacts);

exports.getContact = factory.getOne(Contacts);

exports.updateContact = factory.updateOne(Contacts);

exports.deleteContact = factory.deleteOne(Contacts);
