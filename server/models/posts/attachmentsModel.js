const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;

const attachmentSchema = new Schema(
  {
    company_logo: {
      type: types.String
    },
    gallary_image: {
      type: types.String
    },
    company_profile: {
      type: types.String
    },
    company_catalogue: {
      type: types.String
    },
    status: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'company_attachment',
    timestamps: false,
    strict: false // tells to mongoose that schema may "grow"
  }
);

module.exports = mongoose.model('companyAttachment', attachmentSchema);
