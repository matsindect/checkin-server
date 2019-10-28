const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = Schema.Types;
const validator = require('validator');

const statisticsSchema = new Schema(
  {
    labour_force: {
      type: types.Number
    },
    secondary_labour: {
      type: types.Number,
      default: false
    },
    office_admin_staff: {
      type: types.Number
    },
    accreditation: {
      type: types.String
    },
    annual_projects_value: {
      type: types.String
    },
    current_project_value: {
      type: types.String
    },
    credit_allowance: {
      type: types.String,
      enum: ['YES', 'NO'],
      default: 'NO'
    },
    min_order_accepted: {
      type: types.String
    },
    status: {
      type: types.Boolean,
      default: true
    }
  },
  {
    collection: 'company_statistics',
    timestamps: false,
    strict: false // tells to mongoose that schema may "grow"
  }
);

const Statistics = mongoose.model('companyStatistics', statisticsSchema);

module.exports = Statistics;
