const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const countrySchema = new Schema({
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
});

countrySchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

countrySchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('country', countrySchema);
