const APIresourceFunc = require('../utils/APIresourceFunc');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const AppError = require('../utils/appError');

const filterInputObj = (obj, ...allowedFields) => {
  const newInputsObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newInputsObj[el] = obj[el];
  });
  return newInputsObj;
};

exports.createOne = Model =>
  catchAsyncFunc(async (req, res, next) => {
    if (req.file) req.body.icon = req.file.filename;
    const doc = await Model.create(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        doc: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsyncFunc(async (req, res, next) => {
    let filter = {};
    if (req.params.specifierId)
      filter = { specifier_company: req.params.specifierId };
    if (req.params.projectsId) filter = { projects: req.params.projectsId };

    const tax_terms = new APIresourceFunc(Model.find(filter), req.query)
      .AdvancedFilter()
      .sort()
      .fieldSort()
      .paginate();

    const doc = await tax_terms.query;

    res.status(200).send({
      status: 'Success',
      results: doc.length,
      data: {
        doc
      }
    });
  });

exports.getOne = (Model, populateOption) =>
  catchAsyncFunc(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOption)
      query = Model.findById(req.params.id).populate(populateOption);

    const doc = await query;
    if (!doc) {
      return next(new AppError('There is no document with that id', 404));
    }
    res.status(200).send({
      status: 'Success',
      data: {
        doc
      }
    });
  });

exports.updateOne = Model =>
  catchAsyncFunc(async (req, res, next) => {
    if (req.file) req.body.icon = req.file.filename;
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('There is no document with that id', 404));
    }

    res.status(200).send({
      status: 'Success',
      data: {
        doc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsyncFunc(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      status: false
    });

    if (!doc) {
      return next(new AppError('There is no document with that id', 404));
    }
    res.status(204).send({
      status: 'Success',
      data: null
    });
  });
