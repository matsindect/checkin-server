const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const validator = require('validator');
const slugify = require('slugify');

const projectContactsSchema = new Schema({
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
  company: {
    type: types.String
  },
  company_email_address: {
    type: types.String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  }
});

projectContactsSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

projectContactsSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

const ProjectContacts = mongoose.model(
  'projectContacts',
  projectContactsSchema
);

module.exports = ProjectContacts;
