const Projects = require('../models/posts/projectsModel');
const CompanyAttachments = require('../models/posts/attachmentsModel');
const ContactInfo = require('../models/posts/contactInfoModel');
const catchAsyncFunc = require('../utils/catchAsyncFuncs');
const AppError = require('../utils/appError');
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
  if (!req.file) return next();
  // Company logo
  if (req.file.company_logo) {
    req.files.company_logo.filename = `tax-${removeSpace(
      req.body.project_name
    )}-${Date.now()}-logo.jpeg`;

    await sharp(req.files.company_logo[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/ProjectImages/${req.files.company_logo}`);
  }

  // Gallary images
  if (req.files.gallary_image) {
    req.files.gallary_image.filename = `tax-${removeSpace(
      req.body.project_name
    )}-${Date.now()}-gallary.jpeg`;

    await sharp(req.files.gallary_image[0].buffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/ProjectImages/${req.files.gallary_image.filename}`);
  }

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
  if (contact) taxonomy.project_contacts = contact._id;
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

exports.updateProjects = catchAsyncFunc(async (req, res, next) => {
  if (req.body.project_contacts && req.body.project_contacts._id) {
    console.log(req.body.project_contacts);
    const contact = await ContactInfo.findByIdAndUpdate(
      req.body.project_contacts._id,
      req.body.project_contacts,
      {
        new: true,
        runValidators: true
      }
    );
    if (!contact) {
      return next(new AppError('There is no contacts with that id', 404));
    }
  } else if (
    req.body.project_contacts == null ||
    req.body.project_contacts._id == null
  ) {
    const info = await ContactInfo.create(req.body.project_contacts);

    if (info) req.body.project_contacts = info;
  }

  if (req.body.company_attachments) {
    console.log(req.body.company_attachments);
    const attachment = await CompanyAttachments.findByIdAndUpdate(
      req.body.company_attachments._id,
      {
        $set: {
          company_logo: req.file.company_logo.filename || req.body.company_logo,
          gallary_image:
            req.files.gallary_image.filename || req.body.gallary_image
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!attachment) {
      return next(new AppError('There is no attatchment with that id', 404));
    }
  } else if (req.body.company_attachments == null) {
    if (req.file) {
      req.body.company_attachments = { company_logo: req.file.filename };
    }
    const attachment = await CompanyAttachments.create(
      req.body.company_attachments
    );

    if (attachment) req.body.company_attachments = attachment;
  }

  const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!project) {
    return next(new AppError('There is no project with that id', 404));
  }

  res.status(200).send({
    status: 'Success',
    data: {
      doc: project
    }
  });
});

exports.deleteProjects = factory.deleteOne(Projects);
