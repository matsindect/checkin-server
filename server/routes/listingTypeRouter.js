const express = require('express');
const authController = require('./../controllers/authController');
const listingtypeController = require('./../controllers/listingtypeController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    listingtypeController.createListingType
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    listingtypeController.getListingTypes
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    listingtypeController.getListingType
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    listingtypeController.updateListingType
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    listingtypeController.deleteListingType
  );
module.exports = router;
