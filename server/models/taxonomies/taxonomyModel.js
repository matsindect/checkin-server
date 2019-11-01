const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const taxonomySchema = new Schema(
  {
    taxonomy_type: {
      required: [true, 'taxonomy type is requred'],
      enum: [
        'specifier-type',
        'specifier-contacts',
        'categories',
        'project-type',
        'project-contacts',
        'keyclients',
        'keyprojects',
        'sectors',
        'products',
        'stackhoders'
      ],
      type: types.String
    },
    label: {
      required: 'please enter label',
      trim: true,
      type: types.String
    },
    slug: {
      type: types.String,
      trim: true
    },
    icon: {
      type: types.String,
      trim: true
    },
    status: {
      type: types.Boolean,
      default: true
    },
    term_options: {
      type: types.ObjectId,
      ref: 'taxonomySettings',
      default: null
    }
  },
  {
    collection: 'taxonomy',
    timestamps: true,
    strict: true
  }
);

taxonomySchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

taxonomySchema.pre(/^find/, function(next) {
  this.populate('term_options').lean();
  next();
});

taxonomySchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('taxonomy', taxonomySchema);
