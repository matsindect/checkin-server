const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const sectorSchema = new Schema({
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

sectorSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

sectorSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

const Sector = mongoose.model('sector', sectorSchema);

module.exports = Sector;
