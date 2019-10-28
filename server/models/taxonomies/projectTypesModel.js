const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const projectTypesSchema = new Schema({
  label: {
    required: [true, 'please enter label'],
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
  }
});

projectTypesSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

projectTypesSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

const ProjectTypes = mongoose.model('projectTypes', projectTypesSchema);

module.exports = ProjectTypes;
