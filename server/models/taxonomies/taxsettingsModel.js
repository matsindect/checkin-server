const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;

const taxsettingsSchema = new Schema(
  {
    company_name: {
      type: types.String
    },
    listing_type: {
      type: types.String
    },
    status: {
      type: types.Boolean,
      default: true
    }
  },

  {
    collection: 'taxonomy_settings',
    timestamps: false,
    strict: false // tells to mongoose that schema may "grow"
  }
);

const Taxsettings = mongoose.model('taxonomySettings', taxsettingsSchema);

module.exports = Taxsettings;
