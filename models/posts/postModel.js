const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  },
  title: {
    required: [true, 'Title is requred'],
    trim: true,
    type: types.String
  },
  slug: {
    type: types.String,
    trim: true
  },
  description: {
    type: types.String,
    trim: true
  },
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'categories'
    }
  ],
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }
  ],
  published_at: {
    type: Date,
    default: Date.now
  },
  media: {
    type: mongoose.Schema.ObjectIdd,
    ref: 'media',
    default: null
  },
  status: {
    type: types.Boolean,
    default: true
  }
});

postSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

postSchema.pre(/^find/, function(next) {
  this.populate('author')
    .populate('media')
    .populate({ path: 'categories', select: 'label' })
    .lean();
  next();
});

postSchema.pre('save', function(next) {
  this.slug = slugify(this.trade_name, { lower: true });
  next();
});

module.exports = mongoose.model('post', postSchema);
