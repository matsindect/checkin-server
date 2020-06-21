const multer = require('multer');
const sharp = require('sharp');
const Taxonomy = require('../models/taxonomies/taxonomyModel');
const Categories = require('../models/taxonomies/categoriesModel');
const City = require('../models/taxonomies/cityModel');
const Country = require('../models/taxonomies/countryModel');
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
exports.uploadIcon = upload.single('icon');

const removeSpace = item => {
  return item.replace(/\s/g, '-');
};
exports.resizeIcon = catchAsyncFunc(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `tax-${removeSpace(req.body.label)}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/taxImages/${req.file.filename}`);

  next();
});
/////////////////////////////   TAXONOMIES ///////////////////////////////////

exports.createTerm = catchAsyncFunc(async (req, res) => {
  const taxsettings = await Taxsettings.create(req.body.term_options);

  const taxonomy = new Taxonomy(req.body);
  taxonomy.term_options = taxsettings._id;
  await taxonomy.save();

  res.status(201).send({ _id: taxonomy._id });
});

exports.getTerms = factory.getAll(Taxonomy);

exports.getTerm = factory.getOne(Taxonomy);

exports.updateTerm = factory.updateOne(Taxonomy);

exports.deleteTerm = factory.deleteOne(Taxonomy);

///////////////////////////////// City ////////////////////////////////////

exports.createCity = factory.createOne(City);

exports.getCities = factory.getAll(City);

exports.getCity = factory.getOne(City);

exports.updateCity = factory.updateOne(City);

exports.deleteCity = factory.deleteOne(City);

///////////////////////////////// Country ////////////////////////////////////

exports.createCountry = factory.createOne(Country);

exports.getCountries = factory.getAll(Country);

exports.getCountry = factory.getOne(Country);

exports.updateCountry = factory.updateOne(Country);

exports.deleteCountry = factory.deleteOne(Country);

///////////////////////////////// Categories ////////////////////////////////////

exports.createCategories = factory.createOne(Categories);

exports.getCategory = factory.getAll(Categories);

exports.getCategories = factory.getOne(Categories);

exports.updateCategory = factory.updateOne(Categories);

exports.deleteCategory = factory.deleteOne(Categories);
