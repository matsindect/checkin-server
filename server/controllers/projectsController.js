const Projects = require('/server/models/posts/projectsModel');
const CompanyAttachments = require('/servermodels/posts/attachmentsModel');
const ContactInfo = require('/servermodels/posts/contactInfoModel');
const catchAsyncFunc = require('/server/utils/catchAsyncFuncs');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

/////////////////////////////   PROJECTS  ///////////////////////////////////
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

exports.uploadProjectImages = upload.fields([
  { name: 'company_logo', maxCount: 1 },
  { name: 'gallary_image', maxCount: 1 }
]);
exports.processImages = catchAsyncFunc(async (req, res, next) => {
  // Company logo
  req.files.company_logo.filename = `tax-${removeSpace(
    req.body.project_name
  )}-${Date.now()}-logo.jpeg`;

  await sharp(req.files.company_logo[0].buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/ProjectImages/${req.files.company_logo}`);

  // Gallary images
  req.files.gallary_image.filename = `tax-${removeSpace(
    req.body.project_name
  )}-${Date.now()}-gallary.jpeg`;

  await sharp(req.files.gallary_image[0].buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/ProjectImages/${req.files.gallary_image.filename}`);

  req.body.company_attachments = {
    company_logo: req.files.company_logo.filename,
    gallary_image: req.files.gallary_image.filename
  };

  next();
});
exports.createProject = catchAsyncFunc(async (req, res) => {
  const attachment = await CompanyAttachments.create(
    req.body.company_attachments
  );
  const contact = await ContactInfo.create(req.body.contact_info);

  const taxonomy = new Projects(req.body);
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

exports.getProjects = factory.getAll(Projects);

exports.getProject = factory.getOne(Projects, { path: 'contacts' });

exports.updateProjects = factory.updateOne(Projects);

exports.deleteProjects = factory.deleteOne(Projects);
