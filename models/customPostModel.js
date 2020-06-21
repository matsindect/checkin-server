const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const slugify = require('slugify');

const customPostSchema = new Schema(
  {
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
    type: {
      type: types.String,
      trim: true
    },
    status: {
      type: types.Boolean,
      default: true
    },
    link: {
      type: types.String,
      trim: true
    },
    template: {
      type: types.String,
      required: true
    },
    fields: [
      {
        field_label: {
          type: types.String
        },
        icon: {
          type: types.String
        },
        name: {
          type: types.String
        },
        placeholder: {
          type: types.String
        },
        description: {
          type: types.String
        },
        field_type: {
          type: types.String,
          required: true
        },
        custom_class: {
          type: [types.String]
        }
      }
    ],

    cover_detail: [
      {
        cover_fields: {
          type: [types.String]
        },
        call_to_action: {
          type: [types.String]
        }
      }
    ],
    cover_tabs: [
      {
        labels: {
          type: types.String,
          required: true
        },
        permalink: {
          type: types.String
        },
        layout: {
          type: types.String,
          required: true
        }
      }
    ],
    post_preview: [
      {
        design: {
          type: types.String,
          required: true
        },
        header_fields: {
          type: [types.String]
        },
        body_fields: {
          type: [types.String],
          required: true
        },
        footer_fields: {
          type: [types.String],
          required: true
        }
      }
    ]
  },
  {
    collection: 'custom-post',
    timestamps: true,
    strict: false
  }
);

customPostSchema.pre(/^find/, function(next) {
  this.find({ status: { $ne: false } });
  next();
});

// customPostSchema.pre(/^find/, function(next) {
//   this.populate('settings').lean();
//   next();
// });

customPostSchema.pre('save', function(next) {
  this.slug = slugify(this.label, { lower: true });
  next();
});

module.exports = mongoose.model('custom-post', customPostSchema);
