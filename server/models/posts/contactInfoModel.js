const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const validator = require('validator');

const contactInfoSchema = new Schema(
  {
    business_address: {
      type: types.String
    },
    other_address: {
      type: types.String,
      default: false
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
    contact_number: {
      type: types.Number
    },
    fax: {
      type: types.Number
    },
    company_email_address: {
      type: types.String,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    website: {
      type: types.String
    },
    main_contact: {
      type: types.String,
      trim: true
    },
    designation: {
      type: types.String,
      trim: true
    },
    main_contact_number: {
      type: types.String,
      trim: true
    },
    main_email_address: {
      type: types.String,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    secondary_contact: {
      type: types.String,
      trim: true
    },
    secondary_designation: {
      type: types.String,
      trim: true
    },
    secondary_contact_number: {
      type: types.String,
      trim: true
    },
    secondary_email_address: {
      type: types.String,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    status: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'contact_info',
    timestamps: false,
    strict: false // tells to mongoose that schema may "grow"
  }
);
contactInfoSchema.pre(/^find/, function(next) {
  this.populate({ path: 'city', select: 'label' })
    .populate({ path: 'country', select: 'label' })
    .lean();

  next();
});
module.exports = mongoose.model('contactInfo', contactInfoSchema);
