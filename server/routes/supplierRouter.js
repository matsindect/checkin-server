const express = require('express');
const authController = require('./../controllers/authController');
const supplierController = require('./../controllers/supplierController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.uploadSupplierImages,
    supplierController.processImages,
    supplierController.createSupplier
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.getSpecifiers
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.getSupplier
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.uploadSupplierImages,
    supplierController.processImages,
    supplierController.updateSupplier
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    supplierController.deleteSupplier
  );
module.exports = router;
