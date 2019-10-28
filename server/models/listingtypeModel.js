const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const listingTypeSchema = new Schema(
  {
    label: {
      required: 'please enter label',
      trim: true,
      type: types.String
    },
    slug: {
      type: types.String,
      trim: true
    },
    icon: {
      type: types.String,
      trim: true
    },
    type: {
      type: types.String,
      trim: true
    },
    status: {
      type: types.Boolean,
      default: true
    },
    link: {
      type: types.String,
      trim: true
    },
    settings: {
      type: types.ObjectId,
      ref: 'listingtypeSettings',
      default: null
    }
  },
  {
    collection: 'listingType',
    timestamps: true,
    strict: true
  }
);

listingTypeSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

listingTypeSchema.pre(/^find/, function(next) {
  this.populate('settings').lean();
  next();
});

listingTypeSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});
const listingType = mongoose.model('listingType', listingTypeSchema);

module.exports = listingType;
