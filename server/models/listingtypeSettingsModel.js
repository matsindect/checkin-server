const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;

const listingSettingsSchema = new Schema(
  {
    veryfied: {
      type: types.Boolean,
      default: true
    },
    established_date: {
      type: types.Boolean,
      default: true
    },
    trade_licence: {
      type: types.Boolean,
      default: true
    },
    categories: {
      type: types.Boolean,
      default: true
    },
    sector: {
      type: types.Boolean,
      default: true
    },
    region: {
      type: types.Boolean,
      default: true
    },
    key_projects: {
      type: types.Boolean,
      default: true
    },
    key_clients: {
      type: types.Boolean,
      default: true
    },
    about_company: {
      type: types.Boolean,
      default: true
    },
    vat_number: {
      type: types.Boolean,
      default: true
    },
    contact_info: {
      type: types.Boolean,
      default: true
    },
    company_attachments: {
      type: types.Boolean,
      default: true
    },
    company_statistics: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'listingtype_settings',
    timestamps: false,
    strict: false
  }
);

module.exports = mongoose.model('listingtypeSettings', listingSettingsSchema);
