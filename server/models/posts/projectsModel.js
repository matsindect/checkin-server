const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const projectsSchema = new Schema(
  {
    listing_type: {
      type: types.String
    },
    project_name: {
      required: [true, 'please enter project name'],
      trim: true,
      type: types.String
    },
    slug: {
      type: types.String,
      trim: true
    },
    description: {
      type: types.String,
      default: false
    },
    project_type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'projectTypes'
      }
    ],
    project_owner: {
      type: types.String
    },
    stackholders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'stackholders'
      }
    ],
    categories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'categories'
      }
    ],
    project_contacts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'contactInfo'
      }
    ],
    project_stage: {
      type: types.String,
      trim: true
    },
    start_date: {
      type: types.Date,
      trim: true
    },
    target_date: {
      type: types.Date
    },
    company_attachments: {
      type: types.ObjectId,
      ref: 'companyAttachment',
      default: null
    },
    status: {
      type: types.Boolean,
      default: true
    },
    link: {
      type: types.String,
      trim: true
    }
  },
  {
    collection: 'projects',
    timestamps: true,
    strict: true
  }
);

projectsSchema.virtual('contacts', {
  ref: 'Contacts',
  foreignField: 'projects',
  localField: '_id'
});

projectsSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

projectsSchema.pre(/^find/, function(next) {
  this.populate('project_contacts')
    .populate('company_attachments')
    .populate('categories')
    .populate('stackholders')
    .populate({ path: 'project_type', select: 'label' })
    .populate({ path: 'project_location', select: 'label' })
    .populate({ path: 'country', select: 'label' })
    .lean();
  next();
});

projectsSchema.pre('save', function(next) {
  this.slug = slugify(this.project_name, { lower: true });
  next();
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;
