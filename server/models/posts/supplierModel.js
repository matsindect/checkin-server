const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const supplierSchema = new Schema({
  trade_name: {
    required: [true, 'tradenameis requred'],
    trim: true,
    type: types.String
  },
  slug: {
    type: types.String,
    trim: true
  },
  listing_type: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'supplierType',
      required: [true, 'tradenameis requred']
    }
  ],
  veryfied: {
    type: types.Boolean,
    default: false
  },
  established_date: {
    type: types.Date
  },
  trade_licence: {
    type: types.String,
    trim: true
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'categories'
    }
  ],
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'product'
    }
  ],
  sector: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'sector'
    }
  ],
  key_projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'keyprojects'
    }
  ],
  key_clients: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'keyclients'
    }
  ],
  about_company: {
    type: types.String,
    trim: true
  },
  vat_number: {
    type: types.String,
    trim: true
  },
  contact_info: {
    type: types.ObjectId,
    ref: 'contactInfo',
    default: null
  },
  company_attachments: {
    type: types.ObjectId,
    ref: 'companyAttachment',
    default: null
  },
  company_statistics: {
    type: types.ObjectId,
    ref: 'companyStatistics',
    default: null
  },
  status: {
    type: types.Boolean,
    default: true
  },
  link: {
    type: types.String,
    trim: true
  }
});
supplierSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

supplierSchema.pre(/^find/, function(next) {
  this.populate('contact_info')
    .populate('company_attachments')
    .populate('company_statistics')
    .populate({ path: 'categories', select: 'label' })
    .populate({ path: 'key_projects', select: 'label' })
    .populate({ path: 'products', select: 'label' })
    .populate({ path: 'sector', select: 'label' })
    .populate({ path: 'listing_type', select: 'label' })
    .lean();

  next();
});

supplierSchema.pre('save', function(next) {
  this.slug = slugify(this.trade_name, { lower: true });
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
