const express = require('express');
const authController = require('../controllers/authController');
const customPostController = require('../controllers/customPostController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.createCustomPost
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.getCustomPosts
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.getCustomPost
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.updateCustomPost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.deleteCustomPost
  );

//@route     /api/v1/custom/field/
router
  .route('/field/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.createFields
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.updateFields
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.deleteFields
  );

//@route     /api/v1/custom/cover/
router
  .route('/cover/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.createCoverDetails
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.updateCoverDetails
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.deleteCoverDetails
  );

//@route     /api/v1/custom/tab/
router
  .route('/tab/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.createCoverTab
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.updateCoverTab
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.deleteCoverTab
  );

//@route     /api/v1/custom/preview/
router
  .route('/preview/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.createPostPreview
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.updatePostPreview
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    customPostController.deletePostPreview
  );

module.exports = router;
