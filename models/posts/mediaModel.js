const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;

const mediaSchema = new Schema(
  {
    media_title: {
      type: types.String,
      required: true
    },
    slug: {
      type: types.String
    },
    media_alt: {
      type: types.String
    },
    caption: {
      type: types.String
    },
    description: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'media',
    timestamps: true,
    strict: false // tells to mongoose that schema may "grow"
  }
);

module.exports = mongoose.model('media', mediaSchema);
