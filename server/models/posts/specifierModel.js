const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const specifierPostsSchema = new Schema(
  {
    specifier_name: {
      required: 'please enter project name',
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
    contact_info: {
      type: types.ObjectId,
      ref: 'contactInfo',
      default: null
    },
    specifier_type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'specifierTypes'
      }
    ],
    company_attachments: {
      type: types.ObjectId,
      ref: 'companyAttachments',
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
    collection: 'specifier',
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

specifierPostsSchema.virtual('contacts', {
  ref: 'Contacts',
  foreignField: 'specifier_company',
  localField: '_id'
});

specifierPostsSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

specifierPostsSchema.pre(/^find/, function(next) {
  this.populate('contact_info')
    .populate('specifier_type')
    .lean();
  next();
});

specifierPostsSchema.pre('save', function(next) {
  this.slug = slugify(this.specifier_name, { lower: true });
  next();
});

const Specifier = mongoose.model('Specifier', specifierPostsSchema);

module.exports = Specifier;
