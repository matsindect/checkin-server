const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const supplierTypeSchema = new Schema({
  label: {
    required: [true, 'please enter label'],
    trim: true,
    type: types.String
  },
  slug: {
    type: types.String,
    trim: true
  },
  description: {
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

supplierTypeSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

supplierTypeSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('supplierType', supplierTypeSchema);
