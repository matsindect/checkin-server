const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const customPostSchema = new Schema(
  {
    label: {
      required: [true, 'please enter label'],
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
    }
  },
  {
    collection: 'custom-post',
    timestamps: true,
    strict: true
  }
);

customPostSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

customPostSchema.pre(/^find/, function(next) {
  this.populate('settings').lean();
  next();
});

customPostSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('custom-post', customPostSchema);
