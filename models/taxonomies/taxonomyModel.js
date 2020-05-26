const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const taxonomySchema = new Schema(
  {
    post_type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'post_type'
      }
    ],
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
    status: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'taxonomy',
    timestamps: true,
    strict: true
  }
);

taxonomySchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

taxonomySchema.pre(/^find/, function(next) {
  this.populate('post_type').lean();
  next();
});

taxonomySchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('taxonomy', taxonomySchema);
