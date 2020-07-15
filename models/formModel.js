const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
// const slugify = require('slugify');

var appFormSchema = new Schema(
  {
    cp_data: {
      type: mongoose.Schema.ObjectId,
      ref: 'custom-post',
      required: true
    },
    media: {
      type: mongoose.Schema.ObjectId,
      ref: 'media'
    },
    title: {
      type: types.String,
      required: true
    },
    slug: { type: types.String },
    form_data: [Schema.Types.Mixed]
  },
  { strict: false }
);

appFormSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
module.exports = mongoose.model('forms-data', appFormSchema);

// appFormSchema.pre(/^find/, function(next) {
//   this.populate({ path: 'cp_data', select: 'slug' }).lean();
//   next();
// });
