const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const specifierTypesSchema = new Schema({
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

specifierTypesSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

specifierTypesSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});
const SpecifierTypes = mongoose.model('specifierTypes', specifierTypesSchema);

module.exports = SpecifierTypes;
