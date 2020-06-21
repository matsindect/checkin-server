const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const router = express.Router();
//@route    Get api/v1/profile/
//@desc     Get user profile
//@access   Public
router
  .route('/')
  .post(authController.protect, profileController.createProfile)
  .get(authController.protect, profileController.getAllProfiles);
//@route    Post api/v1/profile/:id
router
  .route('/:id')
  .get(authController.protect, profileController.getProfile)
  .patch(authController.protect, profileController.createProfile)
  .delete(authController.protect, profileController.deleteProfile);

//@route    Post api/v1/profile/expeience
router
  .route('/experience/')
  .post(authController.protect, profileController.createExperience);

//@route    Post api/v1/profile/expeience/:exp_id
router
  .route('/experience/:exp_id')
  .post(authController.protect, profileController.deleteExprience);

//@route    Post api/v1/profile/education
router
  .route('/education/')
  .post(authController.protect, profileController.createEducation);

//@route    Post api/v1/profile/education/edu_id
router
  .route('/education/:edu_id')
  .post(authController.protect, profileController.deleteEducation);
module.exports = router;
