const multer = require('multer');
const sharp = require('sharp');
const Taxonomy = require('/server/models/taxonomies/taxonomyModel');
const Taxsettings = require('/server/models/taxonomies/taxsettingsModel');
const SpecifierTypes = require('/server/models/taxonomies/specifierTypesModel');
const ProjectTypes = require('/server/models/taxonomies/projectTypesModel');
const Categories = require('/server/models/taxonomies/categoriesModel');
const City = require('/server/models/taxonomies/cityModel');
const Country = require('/server/models/taxonomies/countryModel');
const KeyClients = require('/server/models/taxonomies/keyClientsModel');
const KeyProjects = require('/server/models/taxonomies/keyProjectsModel');
const Products = require('/server/models/taxonomies/productsModel');
const ProjectContacts = require('/server/models/taxonomies/projectContactsModel');
const Sector = require('/server/models/taxonomies/sectorModel');
const SupplierType = require('/server/models/taxonomies/supplierTypeModel');
const SpecifierContacts = require('/server/models/taxonomies/specifierContactsModel');
const Stackholder = require('/server/models/taxonomies/stackholderModel');
const catchAsyncFunc = require('/server/utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const AppError = require('/server/utils/appError');

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

///////////////////////////// SPECIFIER TYPES ///////////////////////////////////

exports.createSpecifierTypes = factory.createOne(SpecifierTypes);

exports.getSpecifierTypes = factory.getAll(SpecifierTypes);

exports.getSpecifierType = factory.getOne(SpecifierTypes);

exports.updateSpecifierType = factory.updateOne(SpecifierTypes);

exports.deleteSpecifierType = factory.deleteOne(SpecifierTypes);

///////////////////////////// SUPPLIER TYPES ///////////////////////////////////

exports.createSupplierTypes = factory.createOne(SupplierType);

exports.getSupplierTypes = factory.getAll(SupplierType);

exports.getSupplierType = factory.getOne(SupplierType);

exports.updateSupplierType = factory.updateOne(SupplierType);

exports.deleteSupplierType = factory.deleteOne(SupplierType);

///////////////////////// PROJECT TYPES ///////////////////////////////

exports.createProjectTypes = factory.createOne(ProjectTypes);

exports.getProjectTypes = factory.getAll(ProjectTypes);

exports.getProjectType = factory.getOne(ProjectTypes);

exports.updateProjectType = factory.updateOne(ProjectTypes);

exports.deleteProjectType = factory.deleteOne(ProjectTypes);

//////////////// KEY PROJECTS /////////////////////////////////

exports.createKeyProjects = factory.createOne(KeyProjects);

exports.getKeyProjects = factory.getAll(KeyProjects);

exports.getKeyProject = factory.getOne(KeyProjects);

exports.updateKeyProject = factory.updateOne(KeyProjects);

exports.deleteKeyProject = factory.deleteOne(KeyProjects);

/////////////////////// KEY CLIENTS //////////////////////////////////

exports.createKeyClients = factory.createOne(KeyClients);

exports.getKeyClients = factory.getAll(KeyClients);

exports.getKeyClient = factory.getOne(KeyClients);

exports.updateKeyClient = factory.updateOne(KeyClients);

exports.deleteKeyClient = factory.deleteOne(KeyClients);

///////////////////////////// SECTORS //////////////////////////////////////////

exports.createSector = factory.createOne(Sector);

exports.getSectors = factory.getAll(Sector);

exports.getSector = factory.getOne(Sector);

exports.updateSector = factory.updateOne(Sector);

exports.deleteSector = factory.deleteOne(Sector);

////////////////////////////// STACKHOLDERS /////////////////////////////////

exports.createStackholder = factory.createOne(Stackholder);

exports.getStackholders = factory.getAll(Stackholder);

exports.getStackholder = factory.getOne(Stackholder);

exports.updateStackholder = factory.updateOne(Stackholder);

exports.deleteStackholder = factory.deleteOne(Stackholder);

///////////////////////////////// CATEGORIES ////////////////////////////////

exports.createCategories = factory.createOne(Categories);

exports.getCategories = factory.getAll(Categories);

exports.getCategory = factory.getOne(Categories);

exports.updateCategory = factory.updateOne(Categories);

exports.deleteCategory = factory.deleteOne(Categories);

///////////////////////////////// SPECIFIER CONTACTS //////////////////////////

exports.createSpecifierContacts = factory.createOne(SpecifierContacts);

exports.getSpecifierContacts = factory.getAll(SpecifierContacts);

exports.getSpecifierContact = factory.getOne(SpecifierContacts);

exports.updateSpecifierContact = factory.updateOne(SpecifierContacts);

exports.deleteSpecifierContact = factory.deleteOne(SpecifierContacts);

///////////////////////////////// PROJECT CONTACTS ////////////////////////////////////

exports.createProjectContacts = factory.createOne(ProjectContacts);

exports.getProjectContacts = factory.getAll(ProjectContacts);

exports.getProjectContact = factory.getOne(ProjectContacts);

exports.updateProjectContact = factory.updateOne(ProjectContacts);

exports.deleteProjectContact = factory.deleteOne(ProjectContacts);

///////////////////////////////// PRODUCTS ////////////////////////////////////

exports.createProducts = factory.createOne(Products);

exports.getProducts = factory.getAll(Products);

exports.getProduct = factory.getOne(Products);

exports.updateProduct = factory.updateOne(Products);

exports.deleteProduct = factory.deleteOne(Products);

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
