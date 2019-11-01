const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const validator = require('validator');
const slugify = require('slugify');

const stackholderSchema = new Schema({
  label: {
    required: [true, 'please enter label'],
    trim: true,
    type: types.String
  },
  slug: {
    type: types.String,
    trim: true
  },
  logo: {
    type: types.String,
    trim: true
  },
  description: {
    type: types.String,
    trim: true
  },
  designation: {
    type: types.String,
    trim: true
  },
  status: {
    type: types.Boolean,
    default: true
  },
  contact_number: {
    type: types.Number
  },
  telephone: {
    type: types.Number
  },
  company_email_address: {
    type: types.String,
    required: [true, 'Email address is requred'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  }
});

stackholderSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

stackholderSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('stackholders', stackholderSchema);
