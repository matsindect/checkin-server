const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const validator = require('validator');
const slugify = require('slugify');

const contactsSchema = new Schema({
  contact_name: {
    type: types.String,
    required: [true, 'Name is requred'],
    default: false
  },
  slug: {
    type: types.String,
    trim: true
  },
  company_contact_number: {
    type: types.Number
  },
  main_contact_number: {
    type: types.String,
    required: [true, 'Main Contact number is requred'],
    trim: true
  },

  secondary_contact: {
    type: types.Number,
    trim: true
  },
  fax: {
    type: types.Number
  },
  company_email_address: {
    type: types.String,
    required: [true, 'Email address is requred'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  po_box: {
    type: types.Number
  },
  city: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'city'
    }
  ],
  country: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'country'
    }
  ],
  website: {
    type: types.String
  },
  designation: {
    type: types.String,
    required: [true, 'Designation is requred'],
    trim: true
  },
  main_email_address: {
    type: types.String,
    required: [true, 'Email address is requred'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  secondary_email_address: {
    type: types.String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  specifier_company: [
    {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Specify to which company they belong'],
      ref: 'Specifier'
    }
  ],
  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Projects'
    }
  ],
  status: {
    type: types.Boolean,
    default: true
  }
});

contactsSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

contactsSchema.pre('save', function(next) {
  this.slug = slugify(this.contact_name, { lower: true });
  next();
});

module.exports = mongoose.model('Contacts', contactsSchema);
