const CustomPost = require('../models/customPostModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const factory = require('./handlerFactory');

exports.createCustomPost = factory.createOne(CustomPost);

exports.getCustomPost = factory.getAll(CustomPost);

exports.getCustomPost = factory.getOne(CustomPost);

exports.updateCustomPost = factory.updateOne(CustomPost);

exports.deleteCustomPost = factory.deleteOne(CustomPost);
