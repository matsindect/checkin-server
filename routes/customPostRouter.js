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
    customPostController.getCustomPost
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
module.exports = router;
